import React, {createRef, useState} from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, FormGroup, Label, Input, Button, Spinner, Alert } from 'reactstrap';
import axios from 'axios';

const EmailModal = ({pdf, isOpen, toggle, pdfData}) => {

    const [sending, setSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const sendGrid = axios.create({
        baseURL: '/'
    });

    const _onSubmit = async e => {
        e.preventDefault();
        setSending(true);
        console.log(e.target);

        // const emailParams = {
        //     subject: e.target.subject.value,
        //     reply_to: {
        //         name: e.target.fromName.value,
        //         email: e.target.fromEmail.value
        //     },
        //     personalizations: [{
        //         to: {
        //             name: e.target.toName.value,
        //             email: e.target.toEmail.value
        //         }
        //     }],
        //     content: [{
        //         type: 'text/plain',
        //         value: e.target.message.value
        //     }]
        // };

        const emailParams = {
            toName: e.target.toName.value,
            toEmail: e.target.toEmail.value,
            fromName: e.target.fromName.value,
            fromEmail: e.target.fromEmail.value,
            message: e.target.message.value,
            subject: e.target.subject.value,
            attachment: pdfData ? pdfData : false
        }
        console.log({emailParams});

        try {
            const email = await sendGrid.post('/.netlify/functions/send-email', emailParams);
            console.log({email});
            setSuccessMessage('Your email has been sent!');
        } catch (error) {
            console.log({error});
            setErrorMessage(typeof error === 'string' ? error : 'An error ocurred. Please check the console.');
        }

        setSending(false);
    }

    return <Modal isOpen={isOpen} centered={true}>
        <ModalHeader>Email Document</ModalHeader>
        <Form onSubmit={_onSubmit}>
        <ModalBody>
                <FormGroup>
                    <Label>From Name</Label>
                    <Input name="fromName" />
                </FormGroup>
                <FormGroup>
                    <Label>From Email</Label>
                    <Input type="email" name="fromEmail" />
                </FormGroup>

                <FormGroup>
                    <Label>To Name</Label>
                    <Input name="toName" />
                </FormGroup>
                <FormGroup>
                    <Label>To Email</Label>
                    <Input type="email" name="toEmail" />
                </FormGroup>

                <FormGroup>
                    <Label>Subject</Label>
                    <Input name="subject" />
                </FormGroup>
                <FormGroup>
                    <Label>Message</Label>
                    <Input type="textarea" name="message" />
                </FormGroup>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                {successMessage && <Alert color="success">{successMessage}</Alert>}
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between">
            <Button onClick={toggle} disabled={sending}>Cancel</Button>
            <Button color="primary" disabled={sending}>{sending ? <Spinner size="sm" /> : 'Send Message'}</Button>
        </ModalFooter>
        </Form>
    </Modal>
}

export default EmailModal;