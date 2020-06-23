import React, {lazy, Suspense, useEffect, useState} from 'react';
import Loader from '../components/Loader/Loader';
import qs from 'query-string';
import Axios from 'axios';

const SurveyCreator = lazy(() => import('../components/JBBuilder/SurveyCreator/SurveyCreator'));

const Creator = () => {

    const [json, setJson] = useState(false);

    // Check Query for Anything
    let queryParams = {};
    if (typeof window !== 'undefined') queryParams = qs.parse(window.location.search);

    useEffect(() => {
        async function getJson() {
            if (queryParams.interviewJson) {
                const interviewFile = await Axios.get(queryParams.interviewJson);
                console.log({interviewFile});
                setJson(JSON.stringify(interviewFile.data));
            } else {
                setJson('');
            }
        }
        getJson();

    }, []);

    return(
        <Suspense fallback={<Loader />}>
            {json !== false && <SurveyCreator interviewJson={json} />}
        </Suspense>
    )
}

export default Creator;