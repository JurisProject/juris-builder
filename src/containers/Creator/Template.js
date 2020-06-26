import React from 'react';
import { Container, Card, CardBody } from 'reactstrap';

import MDEditor from '../../components/JBBuilder/JBMDEditor';

const Template = ({template, setTemplate}) => {

    function _onChange(e) {
        if (setTemplate) setTemplate(e);
    }


    return (
        <Container className="pt-2 pb-2">
            <Card>
                <CardBody>
                    <MDEditor mdTemplate={template || ''} onChange={_onChange} />
                </CardBody>
            </Card>
        </Container>
    )
}

export default Template;