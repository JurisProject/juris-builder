import React from 'react';
import {Row, Col, Container} from 'reactstrap';
import InterviewDemo from '../components/InterviewDemo/InterviewDemo';

const InterviewLoader = () => <div className="d-flex align-items-middle">
    <Spinner />
</div>;

export default () => {
    return (
        <Row>
            <Col className="d-flex align-items-center">
                <h1 className="text-center">Simply the Easiest Document Builder. Ever.</h1>
            </Col>
            <Col>
                <InterviewDemo />
            </Col>
        </Row>
    )
}