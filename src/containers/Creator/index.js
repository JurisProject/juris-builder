import React, {Fragment, useEffect, useState} from 'react';
import qs from 'query-string';
import { Router, Link } from '../../components/Router';
import Creator from './Creator';
import { Navbar, Nav, NavItem, NavLink } from 'reactstrap';
import General from './General';
import Template from './Template';
import Axios from 'axios';

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
                setInterviewFile(queryParams.i);
            }

            if (queryParams.o) {
                const templateFile = await Axios.get(queryParams.o);
                setTemplate(templateFile.data);
                setTemplateFile(queryParams.o);
            }
        }
        getTemplateData();

    }, []);

    const renderView = () => {
        switch(view) {
            case 'creator': return <Creator {...props} interviewJson={interviewJson} />
            case 'template': return <div>Template</div>
            case 'preview': return <div>Preview</div>
            default: return <General {...props}/>
        }
    }


    return (
        <Fragment>
            <Navbar>
                <Nav>
                    <NavItem>
                        <NavLink tag="a" href="#" onClick={() => setView('general')} active={view === 'general'}>General</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag="a" href="#creator" onClick={() => setView('creator')} active={view === 'creator'}>Creator</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag="a" href="#template" onClick={() => setView('template')} active={view === 'template'}>Template</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag="a" href="#preview" onClick={() => setView('preview')} active={view === 'preview'}>Preview</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            <div className="flex-fill">
                {renderView()}
            </div>
        </Fragment>
    )
}

export default CreatorIndex;