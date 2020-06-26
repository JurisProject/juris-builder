"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _classnames = _interopRequireDefault(require("classnames"));

var Survey = _interopRequireWildcard(require("survey-react"));

require("survey-react/survey.css");

require("survey-react/modern.css");

var _this = void 0,
    _jsxFileName = "/Users/sabradesign/Desktop/JURIS/APP/juris-static/juris-builder/src/components/JBBuilder/JBInterview.js";

var Interview = function Interview(_ref) {
  var json = _ref.json,
      output = _ref.output,
      className = _ref.className,
      onUpdate = _ref.onUpdate,
      onComplete = _ref.onComplete,
      autoSave = _ref.autoSave,
      onPartialSend = _ref.onPartialSend;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      model = _useState2[0],
      setModel = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      initialData = _useState4[0],
      setInitialData = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      initialPage = _useState6[0],
      setInitialPage = _useState6[1];

  var storageName = 'JurisInterviewData';
  Survey.StylesManager.applyTheme("modern");
  (0, _react.useEffect)(function () {
    setupSurveyModel();
  }, []);

  function setupSurveyModel() {
    if (autoSave || typeof autoSave === 'undefined') {
      var autoSaveDataString = window.localStorage.getItem(storageName);

      if (autoSaveDataString) {
        var autoSaveData = JSON.parse(autoSaveDataString);
        setInitialData(autoSaveData);
        if (autoSaveData.pageNo) setInitialPage(autoSaveData.pageNo);
      }
    }

    setModel(new Survey.Model(json));
  }

  function saveSurveyData(survey) {
    var data = survey.data;
    data.pageNo = survey.currentPageNo;
    window.localStorage.setItem(storageName, JSON.stringify(data));
  }

  var _onComplete = function _onComplete(e) {
    window.localStorage.removeItem(storageName);
    onComplete ? onComplete(e) : false;
  };

  var _onUpdate = function _onUpdate(e) {
    return onUpdate ? onUpdate(e) : false;
  };

  var _onPartialSend = function _onPartialSend(survey) {
    if (autoSave || typeof autoSave === 'undefined') saveSurveyData(survey);
    if (onPartialSend) onPartialSend(survey);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])('interview-container', className),
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 13
    }
  }, model ? /*#__PURE__*/_react["default"].createElement(Survey.Survey, {
    model: model,
    onComplete: _onComplete,
    onValueChanged: _onUpdate,
    sendResultOnPageNext: true,
    onPartialSend: _onPartialSend,
    data: initialData,
    currentPageNo: initialPage,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 18
    }
  }) : /*#__PURE__*/_react["default"].createElement(_reactstrap.Spinner, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 72,
      columnNumber: 22
    }
  }));
};

var _default = Interview;
exports["default"] = _default;