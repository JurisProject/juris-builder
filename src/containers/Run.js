import React, {useState, useEffect, Suspense, lazy, Fragment} from 'react';
import qs from 'query-string';
import {Spinner, Container, Modal, ModalBody, Button, Row, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faAt, faEnvelope } from '@fortawesome/free-solid-svg-icons'


import testInterview from '../constants/testInterview.json';
import Axios from 'axios';
import Loader from '../components/Loader/Loader';
import EmailModal from '../components/EmailModal/EmailModal';

const CodeEditor = lazy(() => import(`../components/JBBuilder/JBCodeEditor`) );
const Interview = lazy(() => import(`../components/JBBuilder/JBInterview`) );
const DocumentPreview = lazy(() => import(`../components/JBBuilder/JBDocumentPreview`) );

const Run = (props) => {

    const [interviewFile, setInterviewFile] = useState(false);
    const [json, setJson] = useState(false);
    const [formData, setFormData] = useState({});
    const [template, setTemplate] = useState(false);
    const [templateFile, setTemplateFile] = useState(false);

    const [interviewData, setInterviewData] = useState(false);
    const [pdfBase64, setPdfBase64] = useState(false);

    const [modalOpen, setModalOpen] = useState(true);
    const [emailModalOpen, setEmailModalOpen] = useState(false);

    const showJuris = !!process.env.JURIS_URL;

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

    function setupSurveyModel(interviewJson) {
        setJson(interviewJson);
    }

    function onInterviewUpdate(data) {
        const newFormData = {...data.data, interviewFile, templateFile};
        setFormData(newFormData);

        // window.parent.postMessage(JSON.stringify(data.data), "*" );
    }

    function onInterviewComplete(survey) {

        // Show the PDF for Download
        if (template) setInterviewData({...survey.data, interviewFile, templateFile});
    }

    function _sendPDF(data, blob) {
        try{

        if (queryParams.sendPDF) {
            const sendData = {
                pdf: data,
                interviewData,
                blob
            }

            if (queryParams.sendPDFFunc) {
                window.parent.postMessage({
                    func: queryParams.sendPDFFunc,
                    data: sendData
                }, '*');
            } else {
                window.parent.postMessage({
                    func: 'JurisGetPDF',
                    data: sendData
                },'*');
            }
        }

        // console.log({data});
        setPdfBase64(data);

    } catch(e) {
        console.log(e);
    }
    }

    const sendWithJuris = async () => {
        // setLoading(true);

        const fileData = await Axios({
            responseType: 'arraybuffer',
            url:['data:application/pdf;base64,', pdfBase64].join('')
        });
        const file = new File([fileData.data], 'document.pdf', {type: fileData.headers['content-type']});
        console.log({file});

        // Get Signed PDF
        const urlParams = {
            method: 'post',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            baseURL: '/',
            url: '/.netlify/functions/s3-signature',
            data: {name: file.name}
        };
        console.log({urlParams});
        const signedUrl = await Axios(urlParams);
        console.log({signedUrl});

        const uploadedFile = await Axios.put(signedUrl.data.url, file, {
            params: {
                'Content-Type': file.type,
                'Content-Length': file.size
            },
            headers: {'content-type': 'application/octet-stream'}
        });

        console.log({uploadedFile});

        window.parent.open(`${process.env.JURIS_URL}?pdfUrl=${uploadedFile.config.url}`, '_blank');
    }

    const toggle = () => setModalOpen(!modalOpen);
    const toggleEmail = () => setEmailModalOpen(!emailModalOpen);

    return (
        <Container style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

            <Suspense fallback={<Loader />}>
                {interviewData ?
                    <Fragment>
                        <Modal isOpen={modalOpen} autoFocus={true} centered={true}>
                            <ModalBody className='text-center'>
                                <h3 className="mb-5">What would you like to do next?</h3>

                                <Row>
                                    <Col className="d-flex">
                                        <Button size="block" color="primary" className="mb-3 p-1 pt-2 d-flex flex-column align-items-center justify-content-center" onClick={toggle}>
                                            <FontAwesomeIcon icon={faEye} size="3x" className="mb-2"/>
                                            <div>View PDF</div>
                                        </Button>
                                    </Col>
                                    <Col className="d-flex">
                                        <Button disabled={!pdfBase64} size="block" color="primary" onClick={toggleEmail} className="mb-3 p-1 pt-2 d-flex flex-column align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faAt} size="3x" className="mb-2"/>
                                            <div>Email PDF</div>
                                        </Button>
                                    </Col>
                                    {showJuris && <Col className="d-flex">
                                        <Button disabled={!pdfBase64} size="block" color="primary" onClick={sendWithJuris} className="mb-3 p-1 pt-2 d-flex flex-column align-items-center justify-content-center">
                                            <FontAwesomeIcon icon={faEnvelope} size="3x" className="mb-2"/>
                                            <div>Mail PDF with Juris MailRoom</div>
                                        </Button>
                                    </Col>}
                                </Row>

                            </ModalBody>
                        </Modal>
                        <EmailModal isOpen={emailModalOpen} toggle={toggleEmail} pdfData={pdfBase64} />
                        <DocumentPreview data={interviewData} mdTemplate={template} asPDF={true} sendPDF={_sendPDF} iFrameAttr={{style: {minHeight: "100%", flex: "1"}}} />
                        <Button color="primary" onClick={toggle} style={{transition: ".5s all", position: "fixed", zIndex: "3", right: "20px", bottom: "20px", transform: modalOpen ? "translateY(60px)" : "translateY(0)"}}>Share</Button>
                    </Fragment> :
                    <Fragment>
                        {json ? <Interview json={json} onUpdate={onInterviewUpdate} onComplete={onInterviewComplete} /> : <Loader />}
                    </Fragment>
                }
            </Suspense>
        </Container>
    )
}

export default Run;