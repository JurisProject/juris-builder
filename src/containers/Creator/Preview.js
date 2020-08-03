import React, {useState} from 'react';
import { Container, Row, Col, Spinner } from 'reactstrap';
import Interview from '../../components/JBBuilder/JBInterview';
import DocumentPreview from '../../components/JBBuilder/JBDocumentPreview';

const Preview = ({mdTemplate, interviewJson, interviewUrl, templateUrl}) => {

    const [data, setData] = useState({});

    function _onUpdate(survey) {
        setData({...survey.data, ...{interviewFile: interviewUrl, templateFile: templateUrl}});
    }

    return (
        <Container fluid>
            {(mdTemplate && interviewJson) ? <Row style={{minHeight: "100%"}}>
                <Col>
                    <Interview json={interviewJson} onUpdate={_onUpdate} />
                </Col>
                <Col>
                    <DocumentPreview mdTemplate={mdTemplate} data={data} asPDF={true} iFrameAttr ={{style:{minHeight: '100%', flex: '1'}}} />
                </Col>
            </Row> : <Spinner />}
        </Container>
    )
}

export default Preview;