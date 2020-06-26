import React, {lazy, Suspense, useEffect, useState} from 'react';
import Loader from '../../components/Loader/Loader';
import qs from 'query-string';
import Axios from 'axios';
import {useParams} from '@reach/router';

const SurveyCreator = lazy(() => import('../../components/JBBuilder/SurveyCreator/SurveyCreator'));

const Creator = ({queryParams, interviewJson}) => {

    // Check Query for Anything
    // let queryParams = {};
    // if (typeof window !== 'undefined') queryParams = qs.parse(window.location.search);

    return(
        <Suspense fallback={<Loader />}>
            {interviewJson !== false && <SurveyCreator interviewJson={JSON.stringify(interviewJson)} />}
        </Suspense>
    )
}

export default Creator;