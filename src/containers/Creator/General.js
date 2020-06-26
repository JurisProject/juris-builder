import React from 'react';
import { Container, Form, FormGroup, Input, Label, Button, Card, CardBody } from 'reactstrap';

const General = ({queryParams}) => {
    return (
        <Container className="pt-4 pb-4">
            <h1>Interview Debugger</h1>
            <Card>
                <CardBody>
                    <Form>
                        <FormGroup>
                            <Label>Interview File URL</Label>
                            <Input name="i" defaultValue={queryParams.i} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Template File URL</Label>
                            <Input name="o" defaultValue={queryParams.o} />
                        </FormGroup>
                        <Button>Set Files</Button>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    )
}

export default General;