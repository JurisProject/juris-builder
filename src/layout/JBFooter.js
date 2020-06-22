import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import "./JBFooter.scss";

const JBFooter = ({hide}) => {
    return hide ? null : (
        <footer id="jb-footer">
            <Container>
                <Row>
                    <Col>
                        Footer 1
                    </Col>
                    <Col>
                        Footer 1
                    </Col>
                    <Col>
                        Footer 1
                    </Col>
                    <Col>
                        Footer 1
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default JBFooter;