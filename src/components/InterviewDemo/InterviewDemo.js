import React, {lazy, Suspense, useState, useEffect, Fragment} from 'react';
import {Spinner, Card, CardBody, CardFooter, Button, CardHeader, Alert} from 'reactstrap';

const InterviewDemo = () => {

    const interviewFile = "https://raw.githubusercontent.com/JurisLibrary/Builder-Demo/master/interview.json";
    const mdTemplate = "https://raw.githubusercontent.com/JurisLibrary/Builder-Demo/master/template.md";

    const [iframeSrc, setIframeSrc] = useState(`/run?i=${interviewFile}&o=${mdTemplate}&hideUI=1&sendPDF=1`);

    const [outputData, setOutputData] = useState(false);

    const restartInterview = async () => {
        await setOutputData(false);
        await setIframeSrc('');
        await setIframeSrc(`/run?i=${interviewFile}&o=${mdTemplate}&hideUI=1&sendPDF=1`);
    }

    useEffect(() => {
        if (window.addEventListener) window.addEventListener("message", onMessage, false);
            else if (window.attachEvent) window.attachEvent("onmessage", onMessage, false);

        console.log('Adding event listeners');
        function onMessage(event) {
            // Check sender origin to be trusted
            if (event.origin !== "http://localhost:8888") return;

            var data = event.data;

            if (typeof(window[data.func]) == "function") {
                window[data.func].call(null, data.data);
            }
        }

        window.JurisGetPDF = function (pdfData) {
            // Write your code here
            console.log({pdfData});
            setOutputData(pdfData.interviewData);
        }
    },[]);

    return(
        <Card style={{height: "100%"}}>
            <CardHeader>Sample Interview</CardHeader>
            <CardBody style={{overflow: "auto"}}>
                <iframe src={iframeSrc} width="100%" height="100%" style={{border: "none"}}></iframe>
            </CardBody>
            <CardFooter>
                <Button onClick={restartInterview}>Restart</Button>
            </CardFooter>
        </Card>
    )
}

export default InterviewDemo;