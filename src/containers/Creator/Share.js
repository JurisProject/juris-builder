import React, {useState, useEffect, Fragment} from 'react';
import { Card, CardHeader, CardBody, Container, Alert, FormGroup, Form, Input, Label, FormText } from 'reactstrap';

const Share = ({interviewUrl, templateUrl}) => {
    const root = window.location.origin;

    const [url, setUrl] = useState(root);
    const [code, setCode] = useState('');

    const [sendPdf, setSendPdf] = useState(false);

    const receivePDFCode = `<script type="application/javascript">
        (function() {
            if (window.addEventListener) window.addEventListener("message", onMessage, false);
            else if (window.attachEvent) window.attachEvent("onmessage", onMessage, false);

            console.log('Adding event listeners');
            function onMessage(event) {
                // Check sender origin to be trusted
                if (event.origin !== "${root}") return;

                var data = event.data;

                if (typeof(window[data.func]) == "function") {
                    window[data.func].call(null, data.data);
                }
            }

            window.JurisGetPDF = function (pdfData) {
                // Write your code here
                console.log({pdfData});
            }
        })();
    </script>\n`;

    function buildUrl() {

        let code = '';
        let url = [
            root,
            "/run?",
            `i=${interviewUrl}&`,
            `o=${templateUrl}&`,
            `hideUI=1`
        ].join('');

        if (sendPdf) {
            url += '&sendPDF=1';

        }

        code += [
            '<iframe src="',
            url,
            '" style="width:100%;border:none;" />'
        ].join('');

        setUrl(url);
        setCode(code);
    }

    useEffect(() => {
        buildUrl();
    }, [sendPdf]);

    return (
        <Container className="pt-4 pb-4">
            <Card className="mb-4">
                <CardHeader>With Link</CardHeader>
                <CardBody>
                    <Alert color="secondary">
                    <code>{url}</code>
                    </Alert>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>With iFrame</CardHeader>
                <CardBody>
                    <h4>Options</h4>

                    <FormGroup>
                        <Input type="checkbox" name="sendPDF" onChange={e => setSendPdf(e.target.checked)} style={{position: 'relative', marginLeft: '0', marginRight: '1rem'}} />
                        <Label>Send PDF to parent document?</Label>
                    </FormGroup>

                    <h4>The Code</h4>
                    <FormGroup className="mb-4">
                    <Label>Paste this where you want the form to live</Label>
                    <Input type="textarea" readOnly value={code} />
                    </FormGroup>

                    {sendPdf && <FormGroup>
                        <Label>Paste this code before the <code>{'</head>'}</code> tag.</Label>
                        <Input type="textarea" readOnly value={receivePDFCode} />
                    </FormGroup>}
                </CardBody>
            </Card>
        </Container>
    )
}

export default Share;