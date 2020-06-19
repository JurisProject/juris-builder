import React from 'react';
import { useRouteData } from 'react-static'
import { Row, Col, Container, Card, CardBody } from 'reactstrap';
import InterviewCard from '../components/InterviewCard/InterviewCard';

const Interviews = () => {
    const { interviews } = useRouteData()

    return (
        <Container className="pt-4 pb-4">
            <Row>
                {interviews.map( i => <Col key={i.path} sm={12} md={6} lg={4}>
                    <InterviewCard i={i} />
                </Col>)}
            </Row>
        </Container>
    )
}

export default Interviews;