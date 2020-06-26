import React, {useState, useEffect} from 'react';
import { Card, CardHeader, CardBody, Container, Alert } from 'reactstrap';

const Share = ({interviewUrl, templateUrl}) => {
    const root = "https://builder.getjuris.com/";

    const [url, setUrl] = useState(root);
    const [code, setCode] = useState('');

    function buildUrl() {
        const url = [
            root,
            "run?",
            `i=${interviewUrl}&`,
            `o=${templateUrl}&`,
            `hideUI=1`
        ].join('');

        const code = [
            '<iframe src="',
            url,
            '" />'
        ];

        setUrl(url);
        setCode(code);
    }

    useEffect(() => {
        buildUrl();
    }, []);

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
                    <h4>The Code</h4>
                    <Alert color="secondary">
                    <code>{code}</code>
                    </Alert>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Share;