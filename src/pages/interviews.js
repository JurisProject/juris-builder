import React from 'react';
import { useRouteData } from 'react-static'
import { Row, Col, Container, Card, CardBody, Alert } from 'reactstrap';
import InterviewCard from '../components/InterviewCard/InterviewCard';

const Interviews = () => {
    const { interviews } = useRouteData()

    return (
        <Container className="pt-4 pb-4">
            <Row>
                {interviews ? interviews.map( i => <Col key={i.path} sm={12} md={6} lg={4}>
                    <InterviewCard i={i} />
                </Col>) : <Alert>
                    <h3>Sync your own interview library with GitHub!</h3>
                    <p>We've made it super easy to sync a library to your own site.</p>
                </Alert>}
            </Row>
        </Container>
    )
}

export default Interviews;