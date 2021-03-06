import React, {Fragment, useEffect, useState} from 'react';
import qs from 'query-string';
import { Router, Link } from '../../components/Router';
import Creator from './Creator';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import General from './General';
import Template from './Template';
import Axios from 'axios';
import Preview from './Preview';
import Share from './Share';
import Deploy from './Deploy';

// import './Creator.scss';

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
            <Navbar className="creator-nav">
                <Nav>
                    <NavItem active={props['*'] === ''}>
                        <NavLink tag={Link} to="">Load Existing</NavLink>
                    </NavItem>
                    <NavItem active={props['*'] === 'interview'}>
                        <NavLink tag={Link} to="interview">Interview Builder</NavLink>
                    </NavItem>
                    <NavItem active={props['*'] === 'document'}>
                        <NavLink tag={Link} to="document">Document Template</NavLink>
                    </NavItem>
                    <NavItem active={props['*'] === 'preview'}>
                        <NavLink tag={Link} to="preview">Preview</NavLink>
                    </NavItem>
                    <NavItem active={props['*'] === 'deploy'}>
                        <NavLink tag={Link} to="deploy">Deploy</NavLink>
                    </NavItem>
                    <NavItem active={props['*'] === 'share'}>
                        <NavLink tag={Link} to="share">Share</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            <div className="flex-fill d-flex">
                <Router className="d-flex flex-fill">
                    <General {...props} templateUrl={templateUrl} interviewUrl={interviewUrl} path="/" />
                    <Creator interviewJson={interviewJson} setInterviewJson={setInterviewJson} path="interview" />
                    <Template template={template} setTemplate={setTemplate} path="document" />
                    <Preview mdTemplate={template} {...{interviewJson, templateUrl, interviewUrl}}  path="preview" />
                    <Deploy mdTemplate={template} interviewJson={interviewJson} path="deploy" />
                    <Share templateUrl={templateUrl} interviewUrl={interviewUrl} path="share" />
                </Router>
            </div>
        </Fragment>
    )
}

export default CreatorIndex;