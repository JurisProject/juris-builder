import React, {useState, useEffect, Suspense, lazy, Fragment} from 'react';
import qs from 'query-string';
import {Spinner, Container} from 'reactstrap';

import testInterview from '../constants/testInterview.json';
import Axios from 'axios';
import Loader from '../components/Loader/Loader';

// import Builder from '../components/Builder';

const CodeEditor = lazy(() => import(`../components/JBBuilder/JBCodeEditor`) );
const Interview = lazy(() => import(`../components/JBBuilder/JBInterview`) );
const DocumentPreview = lazy(() => import(`../components/JBBuilder/JBDocumentPreview`) );

const Run = (props) => {

    const [interviewFile, setInterviewFile] = useState(false);
    const [json, setJson] = useState(false);
    const [formData, setFormData] = useState({});
    const [template, setTemplate] = useState(false);

    const [interviewData, setInterviewData] = useState(false);

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
        setJson(interviewJson);
    }

    function onInterviewUpdate(data) {
        setFormData(data.data);
        // console.log({data});

        window.parent.postMessage(JSON.stringify(data.data), "*" );
    }

    function onInterviewComplete(survey) {
        // console.log({completeData});

        // Show the PDF for Download
        if (template) setInterviewData(survey.data);
    }

    return (
        <Container style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Suspense fallback={<Loader />}>
                {interviewData ?
                    <DocumentPreview data={interviewData} mdTemplate={template} asPDF={true} iFrameAttr={{style: {minHeight: "100%", flex: "1"}}} /> :
                    <Fragment>
                        {json ? <Interview json={json} onUpdate={onInterviewUpdate} onComplete={onInterviewComplete} /> : <Loader />}
                    </Fragment>
                }
            </Suspense>
        </Container>
    )
}

export default Run;