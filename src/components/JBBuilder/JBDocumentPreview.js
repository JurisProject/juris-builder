import React, {useEffect, useState, Fragment} from 'react';

import ReactMarkdown from 'react-markdown';
import Handlebars from 'handlebars';

import {Spinner} from 'reactstrap';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import './scss/JBDocumentPreview.scss';

const Document = ({data, mdTemplate, asPDF, iFrameAttr, sendPDF}) => {
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState(false);
    const [source, setSource] = useState(false);
    const [iframeSrc, setIframeSrc] = useState(false);

    useEffect(() => {

        async function getPreview() {
          const mdTemp = Handlebars.compile(mdTemplate);
          setTemplate(mdTemp);

          if (asPDF) {
            const html = await mdTemp(data);
            const pdfUrl = await getPDF(html);

            setIframeSrc(pdfUrl);

            if (sendPDF) {
              const base = await getPDF(html, 'base64');
              sendPDF(base);
            }
          } else {
            setSource(mdTemp(data));
          }
          setLoading(false);
        }
        getPreview();

    }, [data]);

    const getPDF = async (md, output) => {
      const htmlPDF = await ReactMarkdown({source: md});
      const pdfDoc = await htmlToPDF(htmlPDF, output);
      return pdfDoc;
    }

    return (
        loading ? <Spinner /> : <Fragment>
          {asPDF ? <iframe src={iframeSrc} className="iframe-preview" {...iFrameAttr} /> : <ReactMarkdown source={source} />}
        </Fragment>
    )
}

export default Document;

  /**
   * Converts React HTML Components to PDF
   * @param {*} html
   */
  const htmlToPDF = async (html, output = 'blob') => {

    const getTextFromChildren = (children, depth = 0) => {
      if (!children || !children.map || typeof children === 'string') return children;

      // if (children[0] && children[0].props && children[0].props.children && typeof children[0].props.children === 'string') return children[0].props.children;

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
              text.push('\n');
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

        switch(output) {
          case 'base64':
            pdfDocGenerator.getBase64((data) => {
              resolve(data);
            });
            break;
          case 'objecturl':
            pdfDocGenerator.getDataUrl((data) => {
              resolve(URL.createObjectURL(data));
            });
            break;
          case 'blob':
          default:
            pdfDocGenerator.getBlob((data) => {
            // pdfDocGenerator.getBase64((data) => {
            // pdfDocGenerator.getDataUrl((data) => {
              resolve(URL.createObjectURL(data));
            });
        }
      });

    };