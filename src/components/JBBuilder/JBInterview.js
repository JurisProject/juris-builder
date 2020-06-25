import React, {Fragment, useState, useEffect} from 'react';
import {Row, Col, Card, CardBody, FormGroup, Label, Input, Spinner} from 'reactstrap';
import classNames from 'classnames';

import * as Survey from 'survey-react';
// import StylesManager from 'survey-library/src/stylesmanager.tsx';
import 'survey-react/survey.css';
import 'survey-react/modern.css';

const Interview = ({json, output, className, onUpdate, onComplete, autoSave}) => {
    const [model, setModel] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [initialPage, setInitialPage] = useState(0);
    let storageName = 'JurisInterviewData'

    Survey.StylesManager.applyTheme("modern");

    useEffect(() => {
        setupSurveyModel();
    },[]);

    function setupSurveyModel() {
        if (autoSave || typeof autoSave === 'undefined') {
            const autoSaveDataString = window.localStorage.getItem(storageName);
            if (autoSaveDataString) {
                const autoSaveData = JSON.parse(autoSaveDataString);
                setInitialData(autoSaveData);

                if (autoSaveData.pageNo) setInitialPage(autoSaveData.pageNo);
            }
        }

        setModel(new Survey.Model(json));
    }

    function saveSurveyData(survey) {
        let {data} = survey;
        data.pageNo = survey.currentPageNo;
        window.localStorage.setItem(storageName, JSON.stringify(data));
      }

    const _onComplete = e => {
        window.localStorage.removeItem(storageName);

        onComplete ? onComplete(e) : false;
    }
    const _onUpdate = e => onUpdate ? onUpdate(e) : false;

    const _onPartialSend = survey => {
        console.log("Partial Send", {survey});
        if (autoSave || typeof autoSave === 'undefined') saveSurveyData(survey);
    }

    return (<div className={classNames('interview-container', className)}>
        {model ? <Survey.Survey
                model={model}
                onComplete={_onComplete}
                onValueChanged={_onUpdate}
                sendResultOnPageNext={true}
                onPartialSend={_onPartialSend}
                data={initialData}
                currentPageNo={initialPage}
                /> : <Spinner />}
    </div>);
}

export default Interview;