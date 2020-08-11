import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import "./JBFooter.scss";

const JBFooter = ({hide}) => {
    return hide ? null : (
        <footer id="jb-footer" className={hide ? 'hide' : 'show'}>
            <Container>
                <Row>
                    <Col>
                        <h4>Handbook</h4>
                        <p><a href="https://open.getjuris.com/docs/doc1/">Manifesto</a></p>
                        <p><a href="https://open.getjuris.com/docs/doc2/">Mission</a></p>
                        <p><a href="https://open.getjuris.com/docs/doc3/">Join Juris</a></p>
                    </Col>
                    <Col>
                        <h4>Community</h4>
                        <p><a href="https://discord.gg/ecXCaWC">Discord</a></p>
                        <p><a href="https://twitter.com/getjuris">Twitter</a></p>
                    </Col>
                    <Col>
                        <h4>More</h4>
                        <p><a href="https://getjuris.com/publications">Blog</a></p>
                        <p><a href="https://github.com/jurisproject">Github</a></p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default JBFooter;