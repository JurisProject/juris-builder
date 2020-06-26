import React, {useState, useEffect, Suspense, lazy} from 'react';
import qs from 'query-string';
import {Row, Col, Card, CardBody, FormGroup, Label, Input, Spinner, Container, Form, Button} from 'reactstrap';

import testInterview from '../constants/testInterview.json';
import Axios from 'axios';

// import Builder from '../components/Builder';

const CodeEditor = lazy(() => import(`../components/JBBuilder/JBCodeEditor`) );
const Interview = lazy(() => import(`../components/JBBuilder/JBInterview`) );
const DocumentPreview = lazy(() => import(`../components/JBBuilder/JBDocumentPreview`) );

const Debug = (props) => {

    const [interviewFile, setInterviewFile] = useState(false);
    const [json, setJson] = useState(false);
    const [formData, setFormData] = useState({});
    const [template, setTemplate] = useState(false);
    const [templateFile, setTemplateFile] = useState('');

    // Check Query for Anything
    let queryParams = {};
    if (typeof window !== 'undefined') queryParams = qs.parse(window.location.search);

    useEffect(() => {
        async function getInterview() {
            if (queryParams.i) {
                const interviewFile = await Axios.get(queryParams.i);
                setupSurveyModel(interviewFile.data);
                setInterviewFile(queryParams.i);
            } else {
                setupSurveyModel(testInterview);
            }

            if (queryParams.o) {
                const templateFile = await Axios.get(queryParams.o);
                setTemplate(templateFile.data);
                setTemplateFile(queryParams.o);
            }
        }
        getInterview();
    },[]);

    async function setupSurveyModel(urlOrJson) {
        if (typeof urlOrJson === 'string') {
            const interviewFile = await Axios.get(urlOrJson);
            const interviewJson = interviewFile.data;
            console.log({interviewJson});
            setJson(interviewJson);
        } else {
            setJson(urlOrJson);
        }
    }

    function onInterviewUpdate(data) {
        setFormData(data.data);
    }

    function _handleIChange(e) {
        setInterviewFile(e.target.value);
    }

    function _handleOChange(e) {
        setTemplateFile(e.target.value);
    }

    return (
        <Container fluid className="pt-4 pb-4">
            <Suspense fallback={<Spinner />}>
                <Row>
                    <Col>
                        <Card className="mb-4">
                            <CardBody>
                                <Form>
                                    <FormGroup>
                                        <Label>Interview File URL</Label>
                                        <Input name="i" value={interviewFile} onChange={_handleIChange} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Template File URL</Label>
                                        <Input name="o" value={templateFile} onChange={_handleOChange} />
                                    </FormGroup>
                                    <Button>Set Files</Button>
                                </Form>
                            </CardBody>
                        </Card>
                        <CodeEditor json={json} />
                    </Col>
                    <Col>
                        <Card className="mb-4">
                            <CardBody>
                                <Interview json={json} onUpdate={onInterviewUpdate} />
                            </CardBody>
                        </Card>
                        {!!template && <Card className="mb-4">
                            <CardBody>
                                <DocumentPreview data={formData} mdTemplate={template} />
                            </CardBody>
                        </Card>}
                    </Col>
                </Row>
            </Suspense>
        </Container>
    )
}

export default Debug;