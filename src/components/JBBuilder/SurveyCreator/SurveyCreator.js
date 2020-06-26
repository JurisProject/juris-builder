import React, { Component } from "react";
import * as SurveyKo from "survey-knockout";
import * as SurveyJSCreator from "survey-creator";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";

SurveyJSCreator.StylesManager.applyTheme("bootstrap");

//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
//widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

SurveyKo
    .ComponentCollection
    .Instance
    .add({
        name: "fullname",
        title: "Full Name",
        elementsJSON: [
            {
                type: "text",
                name: "firstName",
                title: "First Name",
                isRequired: true
            }, {
                type: "text",
                name: "lastName",
                title: "Last Name",
                isRequired: true,
                startWithNewLine: false
            },
            //Adding new middle name question
            {
                type: "text",
                name: "middleName",
                title: "Middle Name",
                startWithNewLine: false,
                //Initially makes middle name invisible
                visible: false
            }
        ],
        //SurveyJS calls this function one time on registing component, after creating "fullname" class.
        onInit() {
            //SurveyJS will create a new class "fullname". We can add properties for this class onInit()
            SurveyKo
                .Serializer
                .addProperty("fullname", {
                    name: "showMiddleName:boolean",
                    default: false,
                    category: "general"
                });
        },
        //SurveyJS calls this function after creating new question and loading it's properties from JSON
        //It calls in runtime and at design-time (after loading from JSON) and pass the current component/root question as parameter
        onLoaded(question) {
            this.changeMiddleVisibility(question);
        },
        //SurveyJS calls this on a property change in the component/root question
        //It has three parameters that are self explained
        onPropertyChanged(question, propertyName, newValue) {
            if (propertyName == "showMiddleName") {
                this.changeMiddleVisibility(question);
            }
        },
        //The custom function that used in onLoaded and onPropertyChanged functions
        changeMiddleVisibility(question) {
            //get middle question from the content panel
            let middle = question
                .contentPanel
                .getQuestionByName("middleName");
            if (!!middle) {
                //Set visible property based on component/root question showMiddleName property
                middle.visible = question.showMiddleName === true;
            }
        }
    });

class SurveyCreator extends Component {
  surveyCreator;
  componentDidMount() {
    let options = {
        showEmbededSurveyTab: false,
        showState: true
     };

    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      null,
      options
    );

    this.surveyCreator = customizeToolbar(this.surveyCreator);

    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    this.surveyCreator.tabs().push({
      name: "survey-templates",
      title: "My Custom Tab",
      template: "custom-tab-survey-templates",
      action: () => {
          this.surveyCreator.makeNewViewActive("survey-templates");
      },
      data: {},
    });

    this.surveyCreator.render("surveyCreatorContainer");

    if (this.props.interviewJson) this.surveyCreator.text = this.props.interviewJson;
  }

  saveMySurvey = () => {
    console.log(JSON.parse(this.surveyCreator.text));

    if (this.props.onSave) this.props.onSave(this.surveyCreator.text);
  };

  render() {
    return (<div>
      <script type="text/html" id="custom-tab-survey-templates">
        {`<div id="test">TEST</div>`}
      </script>

      <div id="surveyCreatorContainer" />
    </div>);
  }
}

export default SurveyCreator;


const customizeToolbar = (creator) => {
    //Add all countries question into toolbox
    creator
        .toolbox
        .addItem({
            name: "countries",
            isCopied: true,
            iconName: "icon-default",
            title: "All countries",
            json: {
                "type": "dropdown",
                optionsCaption: "Select a country...",
                choicesByUrl: {
                    url: "https://restcountries.eu/rest/v2/all"
                }
            }
        });

    return creator;
}