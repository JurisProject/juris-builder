import React, {lazy, Suspense} from 'react';
import { useRouteData } from 'react-static';
import ReactMarkdown from 'react-markdown';
import { Card, CardBody, Container, Spinner } from 'reactstrap';

const Interview = () => {
    const {interview} = useRouteData();

    const {
        path,
        "README.md" : page,
        "interview.json" : json,
        "output.md": mdTemplate
    } = interview;

    return (
        <Container>
            <ReactMarkdown source={page} />
        </Container>
    )
}

export default Interview;