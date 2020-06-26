"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactAce = _interopRequireDefault(require("react-ace"));

require("ace-builds/src-noconflict/mode-json");

require("ace-builds/src-noconflict/theme-github");

require("ace-builds/src-noconflict/ext-language_tools");

var _this = void 0,
    _jsxFileName = "/Users/sabradesign/Desktop/JURIS/APP/juris-static/juris-builder/src/components/JBBuilder/JBCodeEditor.js";

// const AceEditor = lazy(() => import('react-ace'));
var CodeEditor = function CodeEditor(_ref) {
  var json = _ref.json,
      onUpdate = _ref.onUpdate,
      onChange = _ref.onChange,
      onValidate = _ref.onValidate;
  return /*#__PURE__*/_react["default"].createElement(_react.Suspense, {
    fallback: "Loading editor...",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 13
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactAce["default"], {
    value: JSON.stringify(json, null, '\t'),
    mode: "json",
    theme: "github",
    onChange: onChange,
    name: "editor",
    onValidate: onValidate,
    style: {
      width: "100%"
    },
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 52
    }
  }));
};

var _default = CodeEditor;
exports["default"] = _default;