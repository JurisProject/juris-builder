var AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const S3 = new AWS.S3({apiVersion: '2006-03-01'});

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {

    const body = JSON.parse(event.body)
    const {name} = body;

    console.log({body});

    const ts = Date.now();
    const Key = `builderDocs/${ts}-${name}`;

    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key,
      Expires: 360,
      ContentType: 'application/octet-stream'
    }

    const url = await S3.getSignedUrl('putObject', uploadParams);

    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (err) {
    console.log({err});
    return { statusCode: 500, body: err.toString() }
  }
}
