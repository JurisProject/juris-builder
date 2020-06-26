import React, {useState, useEffect} from 'react';
import { Card, CardHeader, CardBody, Container } from 'reactstrap';

const Share = ({interviewUrl, templateUrl}) => {
    const root = "https://builder.getjuris.com/";

    const [url, setUrl] = useState(root);
    const [code, setCode] = useState('');

    function buildUrl() {
        const url = [
            root,
            "?",
            `i=${interviewUrl}&`,
            `o=${templateUrl}&`,
            `hideUI=1`
        ].join('');

        const code = [
            '<iframe src="',
            url,
            '" />'
        ];

        setCode(code);
    }

    useEffect(() => {
        buildUrl();
    }, []);

    return (
        <Container className="pt-4 pb-4">
            <Card>
                <CardHeader>With iFrame</CardHeader>
                <CardBody>
                    <h4>Options</h4>
                    <h4>The Code</h4>
                    <code>{code}</code>
                </CardBody>
            </Card>
        </Container>
    )
}

export default Share;