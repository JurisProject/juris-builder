import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { Link } from 'components/Router'

const InterviewCard = ({i}) => {
    const info = i['interview.json'];
    return (
        <Card>
            <CardBody>
                <h3>{info.title}</h3>
                <p>{info.description}</p>
                <Button tag={Link} to={`/interviews/${i.path}`}>Go To Interview</Button>
            </CardBody>
        </Card>
    )
}

export default InterviewCard;