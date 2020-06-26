"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _JBCodeEditor = _interopRequireDefault(require("./JBCodeEditor"));

var _JBInterview = _interopRequireDefault(require("./JBInterview"));

var _JBDocumentPreview = _interopRequireDefault(require("./JBDocumentPreview"));

var _default = {
  CodeEditor: _JBCodeEditor["default"],
  Interview: _JBInterview["default"],
  DocumentPreview: _JBDocumentPreview["default"]
};
exports["default"] = _default;