import React, {Fragment} from 'react';
import {Row, Col, Container} from 'reactstrap';
import InterviewDemo from '../components/InterviewDemo/InterviewDemo';

import ReactLogo from '../components/ReactLogo';
import SurveyJSLogo from '../components/SurveyJSLogo';

import './index.scss';
import MarkdownLogo from '../components/MarkdownLogo';

const InterviewLoader = () => <div className="d-flex align-items-middle">
    <Spinner />
</div>;

export default () => {
    return (
        <Fragment>
        <Row className="home-demo-hero">
            <Col className="d-flex align-items-center">
                <h1 className="text-center">Simply the Easiest Document Builder. Ever.</h1>
            </Col>
            <Col className="p-4">
                <InterviewDemo />
            </Col>
        </Row>
        <div className="pt-4 pb-5 dark-bg">
            <h3 className="text-center pb-5">Powered By</h3>
            <Container>
                <Row>
                    <Col className="text-center">
                        <ReactLogo className="tech-logo" />
                        <p>Easily incorporate Juris Interviews into any ReactJS website.</p>
                    </Col>
                    <Col className="text-center">
                        <SurveyJSLogo className="tech-logo" />
                        <p>Build your interviews with the most robust form building platform.</p>
                    </Col>
                    <Col className="text-center">
                        <MarkdownLogo className="tech-logo ml-auto mr-auto" />
                        <p>Build complex documents in Markdown for easy versioning and rendering.</p>
                    </Col>
                </Row>
            </Container>

        </div>
        </Fragment>
    )
}