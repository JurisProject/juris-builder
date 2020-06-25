import React, {useState, useEffect, Suspense, lazy} from 'react';
import qs from 'query-string';
import {Row, Col, Card, CardBody, FormGroup, Label, Input, Spinner} from 'reactstrap';

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

    // Check Query for Anything
    let queryParams = {};
    if (typeof window !== 'undefined') queryParams = qs.parse(window.location.search);

    useEffect(() => {
        async function getInterview() {
            if (queryParams.i) {
                const interviewFile = await Axios.get(queryParams.i);
                setupSurveyModel(interviewFile.data);
                setInterviewFile(queryParams.interviewFile);
            } else {
                setupSurveyModel(testInterview);
            }

            if (queryParams.o) {
                const templateFile = await Axios.get(queryParams.o);
                setTemplate(templateFile.data);
            }
        }
        getInterview();
    },[]);

    function setupSurveyModel(interviewJson) {
        console.log({interviewJson});
        setJson(interviewJson);
    }

    function onInterviewUpdate(data) {
        setFormData(data.data);
    }

    return (
        <Row>
            <Col>

            <h1>Builder</h1>

            <Suspense fallback={<Spinner />}>
                <Row>
                    <Col>
                        <Card className="mb-4">
                            <CardBody>
                                <FormGroup>
                                    <Label>Interview File URL</Label>
                                    {!!interviewFile && <Input name="interviewurl" defaultValue={interviewFile} />}
                                </FormGroup>
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

            </Col>
        </Row>
    )
}

export default Debug;