import React, {Fragment} from 'react';
import {Row, Col, Container, Button} from 'reactstrap';
import {Link} from '../components/Router'
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
            <Col className="d-flex align-items-center flex-column justify-content-center" md={12} lg={6} style={{maxHeight: "100%"}}>
                <h1 className="text-center">Simply the Easiest Document Builder. <br></br>Ever.</h1>
                <Button tag={Link} size="lg" to="/builder" color="primary">Get Building!</Button>
            </Col>
            <Col className="p-4" md={12} lg={6} style={{maxHeight: "100%"}}>
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