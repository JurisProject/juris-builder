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

      // Convert MD to PDF
      const pdfDoc = await MDtoPDF(md, output);

      return pdfDoc;
    }

    return (
        loading ? <Spinner /> : <Fragment>
          {asPDF ? <iframe src={iframeSrc} className="iframe-preview" {...iFrameAttr} /> : <ReactMarkdown source={source} />}
        </Fragment>
    )
}

export default Document;

    const MDtoPDF = async (md, output = 'blob') => {

      const styles = {
        heading1: {
          fontSize: 22,
          bold: true,
        },
        heading2: {
          fontSize: 16,
          bold: true,
        },
        strong: {
          bold: true
        }
      };

      return new Promise((resolve, reject) => {

        const content = prepMD4PDF(md);

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
        };

      })
    }

    const prepMD4PDF = md => {
      return md.match(/^(.*)$/gm).map(text => {
        if (text.search('#') === 0) {
          const hType = text.search('# ') + 1;
          return {text : text.slice(hType + 1), style: `heading${hType}`};
        } else if (text === '') {
          return {text: '\n'};
        } else {
          return {text: prepInlineMD(text)};
        }
      });
    }

    const prepInlineMD = text => {

      let strongTextArr = text.split('**')

      if (strongTextArr.length > 1) {
        // Address Bold
        strongTextArr = strongTextArr.map((text,i) => {
              if (i % 2 == 1) return {text, style:'strong'};
                  else return {text};
          });
      }

      return strongTextArr;
    }