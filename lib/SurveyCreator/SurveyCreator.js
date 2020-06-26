"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var SurveyKo = _interopRequireWildcard(require("survey-knockout"));

var SurveyJSCreator = _interopRequireWildcard(require("survey-creator"));

require("survey-creator/survey-creator.css");

require("jquery-ui/themes/base/all.css");

require("nouislider/distribute/nouislider.css");

require("select2/dist/css/select2.css");

require("bootstrap-slider/dist/css/bootstrap-slider.css");

require("jquery-bar-rating/dist/themes/css-stars.css");

require("jquery-bar-rating/dist/themes/fontawesome-stars.css");

var _jquery = _interopRequireDefault(require("jquery"));

require("jquery-ui/ui/widgets/datepicker.js");

require("select2/dist/js/select2.js");

require("jquery-bar-rating");

require("pretty-checkbox/dist/pretty-checkbox.css");

var widgets = _interopRequireWildcard(require("surveyjs-widgets"));

var _jsxFileName = "/Users/sabradesign/Desktop/JURIS/APP/juris-static/juris-builder/src/components/JBBuilder/SurveyCreator/SurveyCreator.js";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

SurveyJSCreator.StylesManager.applyTheme("bootstrap"); //widgets.icheck(SurveyKo, $);

widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, _jquery["default"]);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, _jquery["default"]);
widgets.jqueryuidatepicker(SurveyKo, _jquery["default"]);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, _jquery["default"]); //widgets.signaturepad(SurveyKo);

widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, _jquery["default"]);
widgets.bootstrapslider(SurveyKo);
SurveyKo.ComponentCollection.Instance.add({
  name: "fullname",
  title: "Full Name",
  elementsJSON: [{
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
  }, //Adding new middle name question
  {
    type: "text",
    name: "middleName",
    title: "Middle Name",
    startWithNewLine: false,
    //Initially makes middle name invisible
    visible: false
  }],
  //SurveyJS calls this function one time on registing component, after creating "fullname" class.
  onInit: function onInit() {
    //SurveyJS will create a new class "fullname". We can add properties for this class onInit()
    SurveyKo.Serializer.addProperty("fullname", {
      name: "showMiddleName:boolean",
      "default": false,
      category: "general"
    });
  },
  //SurveyJS calls this function after creating new question and loading it's properties from JSON
  //It calls in runtime and at design-time (after loading from JSON) and pass the current component/root question as parameter
  onLoaded: function onLoaded(question) {
    this.changeMiddleVisibility(question);
  },
  //SurveyJS calls this on a property change in the component/root question
  //It has three parameters that are self explained
  onPropertyChanged: function onPropertyChanged(question, propertyName, newValue) {
    if (propertyName == "showMiddleName") {
      this.changeMiddleVisibility(question);
    }
  },
  //The custom function that used in onLoaded and onPropertyChanged functions
  changeMiddleVisibility: function changeMiddleVisibility(question) {
    //get middle question from the content panel
    var middle = question.contentPanel.getQuestionByName("middleName");

    if (!!middle) {
      //Set visible property based on component/root question showMiddleName property
      middle.visible = question.showMiddleName === true;
    }
  }
});

var SurveyCreator = /*#__PURE__*/function (_Component) {
  (0, _inherits2["default"])(SurveyCreator, _Component);

  var _super = _createSuper(SurveyCreator);

  function SurveyCreator() {
    var _this;

    (0, _classCallCheck2["default"])(this, SurveyCreator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "surveyCreator", void 0);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "saveMySurvey", function () {
      console.log(JSON.parse(_this.surveyCreator.text));
    });
    return _this;
  }

  (0, _createClass2["default"])(SurveyCreator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var options = {
        showEmbededSurveyTab: false,
        showState: true
      };
      this.surveyCreator = new SurveyJSCreator.SurveyCreator(null, options);
      this.surveyCreator = customizeToolbar(this.surveyCreator);
      this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
      this.surveyCreator.tabs().push({
        name: "survey-templates",
        title: "My Custom Tab",
        template: "custom-tab-survey-templates",
        action: function action() {
          _this2.surveyCreator.makeNewViewActive("survey-templates");
        },
        data: {}
      });
      this.surveyCreator.render("surveyCreatorContainer");
      if (this.props.interviewJson) this.surveyCreator.text = this.props.interviewJson;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 141,
          columnNumber: 13
        }
      }, /*#__PURE__*/_react["default"].createElement("script", {
        type: "text/html",
        id: "custom-tab-survey-templates",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 142,
          columnNumber: 7
        }
      }, "<div id=\"test\">TEST</div>"), /*#__PURE__*/_react["default"].createElement("div", {
        id: "surveyCreatorContainer",
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 146,
          columnNumber: 7
        }
      }));
    }
  }]);
  return SurveyCreator;
}(_react.Component);

var _default = SurveyCreator;
exports["default"] = _default;

var customizeToolbar = function customizeToolbar(creator) {
  //Add all countries question into toolbox
  creator.toolbox.addItem({
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
};