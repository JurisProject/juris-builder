import React from 'react';
import { Container, Card, CardHeader, CardBody, Input } from 'reactstrap';

const Deploy = ({interviewJson, mdTemplate}) => {
    return(
        <Container className="pt-4 pb-4">
            <Card className="mb-4">
                <CardHeader>Save Interview File</CardHeader>
                <CardBody>
                    <p>Copy and paste the following text into your <code>interview.json</code> file.</p>
                    <Input type="textarea" defaultValue={JSON.stringify(interviewJson, null, '\t')} />
                </CardBody>
            </Card>
            <Card>
                <CardHeader>Save Template File</CardHeader>
                <CardBody>
                    <p>Copy and paste the following text into your <code>output.json</code> file.</p>
                    <Input type="textarea" defaultValue={mdTemplate} />
                </CardBody>
            </Card>
        </Container>
    )
}

export default Deploy;