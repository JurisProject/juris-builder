import React, {lazy, Suspense, useEffect, useState} from 'react';
import Loader from '../../components/Loader/Loader';
import qs from 'query-string';
import Axios from 'axios';
import {useParams} from '@reach/router';
import { Container } from 'reactstrap';

const SurveyCreator = lazy(() => import('../../components/JBBuilder/SurveyCreator/SurveyCreator'));

const Creator = ({queryParams, interviewJson, setInterviewJson}) => {

    // Check Query for Anything
    // let queryParams = {};
    // if (typeof window !== 'undefined') queryParams = qs.parse(window.location.search);

    function _onSave(survey) {
        console.log({survey});
        setInterviewJson(JSON.parse(survey));
    }

    return(
        <Container fluid>
            <Suspense fallback={<Loader />}>
                {interviewJson !== false && <SurveyCreator interviewJson={JSON.stringify(interviewJson)} onSave={_onSave} />}
            </Suspense>
        </Container>
    )
}

export default Creator;