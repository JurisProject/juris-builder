import React, {lazy, Suspense, useState, useEffect, Fragment} from 'react';
import {Spinner, Card, CardBody, CardFooter, Button, CardHeader} from 'reactstrap';
import Axios from 'axios';

// import "./InterviewDemo.scss";

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
        <Card style={{height: "100%"}}>
            <CardHeader>Sample Interview</CardHeader>
            <CardBody style={{overflow: "auto"}}>
            <div className="interview-demo" style={{height: "100%"}}>
                <Suspense fallback={<Spinner />}>
                    {!!interview && <Fragment>
                        {data ? <DocumentPreview data={data} mdTemplate={template} asPDF={true} /> : <Interview json={interview} onComplete={onComplete} />}
                    </Fragment>}
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