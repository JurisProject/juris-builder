import path from 'path'
import axios from 'axios'
import dotenv from 'dotenv'
import DocumentContainer from './src/layout/DocumentContainer'
import Axios from 'axios'

dotenv.config()

function remove_non_ascii(str) {

  if ((str===null) || (str===''))
       return false;
 else
   str = str.toString();

  return str.replace(/[^\x20-\x7E]/g, '');
}

export default {
  getRoutes: async () => {

    let paths = [];

    const {JURIS_GITHUB_USERNAME, JURIS_GITHUB_PERSONAL_TOKEN, JURIS_GITHUB_DOCUMENT_REPO} = process.env;
    if (JURIS_GITHUB_USERNAME && JURIS_GITHUB_PERSONAL_TOKEN && JURIS_GITHUB_DOCUMENT_REPO) {
      console.log('Lets build some documents!');

      let interviews = [];

      const GHApi = await Axios.create({
        baseURL: 'https://api.github.com/',
        auth: {
          username: JURIS_GITHUB_USERNAME,
          password: JURIS_GITHUB_PERSONAL_TOKEN
        }
      });

      const getDirUrl = `repos/${JURIS_GITHUB_USERNAME}/${JURIS_GITHUB_DOCUMENT_REPO}/contents`
      const repoContent = await GHApi.get(getDirUrl);
      const intDirs = repoContent.data.filter(i => i.type === "dir");

      for( var x in intDirs) {

        const intDir = intDirs[x];
        let interview = {
          path: intDir.path
        };
        console.log(`Getting ${intDir.path}`)
        const dirFileUrl = `${getDirUrl}/${intDir.path}`;
        const dirFiles = await GHApi.get(dirFileUrl);

        for (var y in dirFiles.data) {
          const dirFile = dirFiles.data[y];
          console.log(`Getting file "${dirFile.path}"`);
          const fileUrl = `${getDirUrl}/${dirFile.path}`;
          const file = await GHApi.get(fileUrl);

          let buff = Buffer.from(file.data.content, 'base64');
          let text = buff.toString('ascii');

          if (file.data.name.split('.').splice(-1)[0] === 'json') text = JSON.parse(remove_non_ascii(text));

          interview[file.data.name] = text;
        }

        interviews.push(interview);
      }

      console.log({interviews});
      paths.push({
        path: '/interviews',
        getData: () => ({
          interviews
        }),
        children: interviews.map(interview => ({
          path: `/${interview.path}`,
          template: 'src/containers/Interview',
          getData: () => ({
            interview,
          })
        }))
      })
    }

    return paths;
  },
  Document: DocumentContainer,
  plugins: [
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
    require.resolve('react-static-plugin-sass')
  ],
}
