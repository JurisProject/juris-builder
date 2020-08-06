import React, {Fragment, Suspense, lazy} from 'react';
import {Modal, ModalBody, Button, Spinner} from 'reactstrap';

import Loader from '../Loader/Loader';

const Interview = lazy(() => import(`../JBBuilder/JBInterview`) );
const DocumentPreview = lazy(() => import(`../JBBuilder/JBDocumentPreview`) );

const EmbeddedRunner = ({
        interviewData,
        json,
        template,
        asPDF,
        sendPDF,
        iFrameAttr,
        onInterviewUpdate,
        onInterviewComplete,
        DocumentPreviewAttrs
    }) => {
    return <Suspense fallback={<Spinner />}>
    {
        interviewData ?
        <Fragment>
            <Modal isOpen={true} autoFocus={true} centered={true} size="lg">
                <ModalBody className='text-center'>
                    <h3>What would you like to do?</h3>

                    <Button size="block" color="primary" className="mb-4">View PDF</Button>
                    <Button size="block" color="primary" disabled className="mb-4">Email PDF</Button>
                    <Button size="block" color="primary" disabled className="mb-4">Mail PDF</Button>
                </ModalBody>
            </Modal>
            <DocumentPreview data={interviewData} mdTemplate={template} asPDF={true} sendPDF={_sendPDF} iFrameAttr={{style: {minHeight: "100%", flex: "1"}}} />
        </Fragment> :
        <Fragment>
            {json ? <Interview json={json} onUpdate={onInterviewUpdate} onComplete={onInterviewComplete} /> : <Loader />}
        </Fragment>
    }
    </Suspense>;
}

export default EmbeddedRunner;