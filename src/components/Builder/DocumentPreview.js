import React, {useEffect, useState} from 'react';

import ReactMarkdown from 'react-markdown';
import Handlebars from 'handlebars';

import {Spinner} from 'reactstrap';

// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Document = ({data, mdTemplate}) => {

    const [template, setTemplate] = useState(false);
    const [source, setSource] = useState(false);

    useEffect(() => {
        const mdTemp = Handlebars.compile(mdTemplate);
        setTemplate(mdTemp);
        setSource(mdTemp(data));

    }, data);

    const getPDF = () => {

    }

    return (
        !!source ? <div>
            <ReactMarkdown source={source} />
        </div> : <Spinner />
    )
}

export default Document;

  /**
   * Converts React HTML Components to PDF
   * @param {*} html
   */
  const htmlToPDF = html => {

    const getTextFromChildren = (children, depth = 0) => {
      if (!children || !children.map || typeof children === 'string') return children;

      if (children[0] && children[0].props && children[0].props.children && typeof children[0].props.children === 'string') return children[0].props.children;

      let listCounter = 1;
      let content = [];

      children.map(c => {
        const style = c.key.split('-')[0];
        let text = [];

        switch(style) {
            case 'list':
              text.push(`${listCounter}. `);
              listCounter++;
              text.push({text: getTextFromChildren(c.props.children, depth + 1)});
              break;
            case 'listItem':
            case 'paragraph':
              text.push({text: getTextFromChildren(c.props.children, depth + 1)});
              text.push('\n');
              break;
            case 'strong':
              text = getTextFromChildren(c.props.children, depth + 1);
              break;
            default:
              text.push({text: getTextFromChildren(c.props.children, depth + 1)});
        }

        content.push({text, style});

        if (depth === 0) content.push('\n');

        return c;
      });

      return content;
    }

    return new Promise((resolve, reject) => {
        let content = getTextFromChildren(html.props.children);

        const styles = {
          heading: {
            fontSize: 22,
            bold: true,
          },
          strong: {
            bold: true
          }
        };

        const pdfDocGenerator = pdfMake.createPdf({content, styles});
        // pdfDocGenerator.getBlob((data) => {
        pdfDocGenerator.getBase64((data) => {
          resolve({data});
        });
      });

    };