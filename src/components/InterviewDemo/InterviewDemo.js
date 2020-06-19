import React, {lazy, Suspense, useState, useEffect} from 'react';

import {Spinner, Card, CardBody, CardFooter, Button, CardHeader} from 'reactstrap';
import Axios from 'axios';

const Interview = lazy(() => import(`../JBBuilder/JBInterview`) );
const DocumentPreview = lazy(() => import(`../JBBuilder/JBDocumentPreview`) );

const InterviewDemo = () => {

    const [data, setData] = useState(false);
    const [interview, setInterview] = useState(false);
    const [template, setTemplate] = useState(false);

    const interviewFile = "https://raw.githubusercontent.com/konstantinbrazhnik/juris-surveys/master/test/interview.json";
    const mdTemplate = "https://raw.githubusercontent.com/konstantinbrazhnik/juris-surveys/master/test/output.md";

    useEffect(() => {
        async function getFiles() {
            const [intFile, tempFile] = await Promise.all([
                Axios.get(interviewFile),
                Axios.get(mdTemplate)
            ]);

            console.log({intFile, tempFile});

            setInterview(intFile.data);
            setTemplate(tempFile.data);
        }
        getFiles();
    }, [])

    function onComplete(e) {
        console.log({e});
        setData(e.data);
    }

    const restartInterview = () => setData(false);

    return(
        <Card>
            <CardHeader>Sample Interview</CardHeader>
            <CardBody>
            <div className="interview-demo">
                <Suspense fallback={<Spinner />}>
                    {data ? <DocumentPreview data={data} mdTemplate={template} /> : <Interview json={interview} onComplete={onComplete} />}
                </Suspense>
            </div>
            </CardBody>
            <CardFooter>
                <Button onClick={restartInterview}>Restart</Button>
            </CardFooter>
        </Card>
    )
}

export default InterviewDemo;