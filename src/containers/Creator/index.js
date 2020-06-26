import React, {Fragment, useEffect, useState} from 'react';
import qs from 'query-string';
import { Router, Link } from '../../components/Router';
import Creator from './Creator';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import General from './General';
import Template from './Template';
import Axios from 'axios';
import Preview from './Preview';

const CreatorIndex = (props) => {
    console.log({props});
    const {children} = props;
    const [templateUrl, setTemplateUrl] = useState(false);
    const [template, setTemplate] = useState(false);
    const [interviewUrl, setInterviewUrl] = useState(false);
    const [interviewJson, setInterviewJson] = useState({});

    const [view, setView] = useState('general');

    // Check Query for Anything
    let queryParams = {};
    if (typeof window !== 'undefined') queryParams = qs.parse(window.location.search);

    useEffect(() => {
        async function getTemplateData() {
            if (queryParams.i) {
                const interviewFile = await Axios.get(queryParams.i);
                setInterviewJson(interviewFile.data);
                console.log("interview file data = ", interviewFile.data);
                setInterviewUrl(queryParams.i);
            }

            if (queryParams.o) {
                const templateFile = await Axios.get(queryParams.o);
                setTemplate(templateFile.data);
                setTemplateUrl(queryParams.o);
            }
        }
        getTemplateData();

    }, []);


    return (
        <Fragment>
            <Navbar>
                <Nav>
                    <NavItem>
                        <NavLink tag={Link} to="">General</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="creator">Creator</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="template">Template</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="preview">Preview</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            <div className="flex-fill">
                <Router>
                    <General {...props} path="/" />
                    <Creator interviewJson={interviewJson} path="creator" />
                    <Template template={template} path="template" />
                    <Preview path="preview" />
                </Router>
            </div>
        </Fragment>
    )
}

export default CreatorIndex;