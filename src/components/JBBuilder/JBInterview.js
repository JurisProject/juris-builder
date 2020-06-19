import React, {Fragment, useState, useEffect} from 'react';
import qs from 'query-string';
import {Row, Col, Card, CardBody, FormGroup, Label, Input, Spinner} from 'reactstrap';
import classNames from 'classnames';

import * as Survey from 'survey-react';
// import StylesManager from 'survey-library/src/stylesmanager.tsx';
import 'survey-react/survey.css';
import 'survey-react/modern.css';

const Interview = ({json, output, className, onUpdate, onComplete}) => {
    const [model, setModel] = useState(false);

    useEffect(() => {
        setupSurveyModel();
        Survey.StylesManager.applyTheme("modern");
    },[]);

    function setupSurveyModel() {
        setModel(new Survey.Model(json));
    }

    const _onComplete = e => onComplete ? onComplete(e) : false;
    const _onUpdate = e => onUpdate ? onUpdate(e) : false;

    return (<div className={classNames('interview-container', className)}>
        {model ? <Survey.Survey model={model} onComplete={_onComplete} onValueChanged={_onUpdate} /> : <Spinner />}
    </div>);
}

export default Interview;