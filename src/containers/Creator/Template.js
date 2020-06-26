import React from 'react';
import { Container, Card, CardBody } from 'reactstrap';

import DocumentPreview from '../../components/JBBuilder/JBDocumentPreview';

const Template = ({template}) => {
    return (
        <Container className="pt-2 pb-2">
            <Card>
                <CardBody>
                    {template ? <DocumentPreview mdTemplate={template} /> : <p>Must load a template.</p>}
                </CardBody>
            </Card>
        </Container>
    )
}

export default Template;