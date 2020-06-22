import React, {useState, useEffect, Suspense, lazy} from 'react';
import qs from 'query-string';
import {Spinner, Container} from 'reactstrap';

import testInterview from '../constants/testInterview.json';
import Axios from 'axios';
import Loader from '../components/Loader/Loader';

// import Builder from '../components/Builder';

const CodeEditor = lazy(() => import(`../components/JBBuilder/JBCodeEditor`) );
const Interview = lazy(() => import(`../components/JBBuilder/JBInterview`) );
const DocumentPreview = lazy(() => import(`../components/JBBuilder/JBDocumentPreview`) );

const Home = (props) => {

    const [interviewFile, setInterviewFile] = useState(false);
    const [json, setJson] = useState(false);
    const [formData, setFormData] = useState({});
    const [template, setTemplate] = useState(false);

    // Check Query for Anything
    const queryParams = qs.parse(window.location.search);

    useEffect(() => {
        async function getInterview() {
            if (queryParams.interviewFile) {
                const interviewFile = await Axios.get(queryParams.interviewFile);
                setupSurveyModel(interviewFile.data);
                setInterviewFile(queryParams.interviewFile);
            } else {
                setupSurveyModel(testInterview);
            }

            if (queryParams.mdTemplate) {
                const templateFile = await Axios.get(queryParams.mdTemplate);
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
    }

    return (
        <Container style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <Suspense fallback={<Loader />}>
                {json ? <Interview json={json} onUpdate={onInterviewUpdate} /> : <Loader />}
            </Suspense>
        </Container>
    )
}

export default Home;