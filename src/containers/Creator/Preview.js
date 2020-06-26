import React, {useState} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Interview from '../../components/JBBuilder/JBInterview';
import DocumentPreview from '../../components/JBBuilder/JBDocumentPreview';

const Preview = ({mdTemplate, interviewJson}) => {

    const [data, setData] = useState({});

    function _onUpdate(survey) {
        setData(survey.data);
    }

    return (
        <Container fluid>
            <Row style={{minHeight: "100%"}}>
                <Col>
                    <Interview json={interviewJson} onUpdate={_onUpdate} />
                </Col>
                <Col>
                    <DocumentPreview mdTemplate={mdTemplate} data={data} asPDF={true} iFrameAttr ={{style:{minHeight: '100%', flex: '1'}}} />
                </Col>
            </Row>
        </Container>
    )
}

export default Preview;