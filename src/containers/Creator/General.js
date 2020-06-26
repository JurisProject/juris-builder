import React from 'react';
import { Container, Form, FormGroup, Input, Label, Button, Card, CardBody } from 'reactstrap';

const General = ({queryParams, templateUrl, interviewUrl}) => {
    return (
        <Container className="pt-4 pb-4">
            <h1>Interview Debugger</h1>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label>Interview File URL</Label>
                            <Input name="i" defaultValue={queryParams.i || interviewUrl} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Template File URL</Label>
                            <Input name="o" defaultValue={queryParams.o || templateUrl} />
                        </FormGroup>
                        <Button>Set Files</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default General;