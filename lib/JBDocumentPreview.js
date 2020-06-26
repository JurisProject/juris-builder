"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactMarkdown = _interopRequireDefault(require("react-markdown"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _reactstrap = require("reactstrap");

var _pdfmake = _interopRequireDefault(require("pdfmake/build/pdfmake"));

var _vfs_fonts = _interopRequireDefault(require("pdfmake/build/vfs_fonts"));

require("./scss/JBDocumentPreview.scss");

var _this = void 0,
    _jsxFileName = "/Users/sabradesign/Desktop/JURIS/APP/juris-static/juris-builder/src/components/JBBuilder/JBDocumentPreview.js";

_pdfmake["default"].vfs = _vfs_fonts["default"].pdfMake.vfs;

var Document = function Document(_ref) {
  var data = _ref.data,
      mdTemplate = _ref.mdTemplate,
      asPDF = _ref.asPDF;

  var _useState = (0, _react.useState)(true),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      template = _useState4[0],
      setTemplate = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      source = _useState6[0],
      setSource = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2["default"])(_useState7, 2),
      iframeSrc = _useState8[0],
      setIframeSrc = _useState8[1];

  (0, _react.useEffect)(function () {
    function getPreview() {
      return _getPreview.apply(this, arguments);
    }

    function _getPreview() {
      _getPreview = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var mdTemp, html, pdfUrl;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                mdTemp = _handlebars["default"].compile(mdTemplate);
                setTemplate(mdTemp);

                if (!asPDF) {
                  _context.next = 12;
                  break;
                }

                _context.next = 5;
                return mdTemp(data);

              case 5:
                html = _context.sent;
                _context.next = 8;
                return getPDF(html);

              case 8:
                pdfUrl = _context.sent;
                setIframeSrc(pdfUrl);
                _context.next = 13;
                break;

              case 12:
                setSource(mdTemp(data));

              case 13:
                setLoading(false);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      return _getPreview.apply(this, arguments);
    }

    getPreview();
  }, [data]);

  var getPDF = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(md) {
      var htmlPDF, pdfDoc;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _reactMarkdown["default"])({
                source: md
              });

            case 2:
              htmlPDF = _context2.sent;
              _context2.next = 5;
              return htmlToPDF(htmlPDF);

            case 5:
              pdfDoc = _context2.sent;
              return _context2.abrupt("return", pdfDoc);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getPDF(_x) {
      return _ref2.apply(this, arguments);
    };
  }();

  return loading ? /*#__PURE__*/_react["default"].createElement(_reactstrap.Spinner, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 19
    }
  }) : /*#__PURE__*/_react["default"].createElement(_react.Fragment, {
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46,
      columnNumber: 33
    }
  }, asPDF ? /*#__PURE__*/_react["default"].createElement("iframe", {
    src: iframeSrc,
    className: "iframe-preview",
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 20
    }
  }) : /*#__PURE__*/_react["default"].createElement(_reactMarkdown["default"], {
    source: source,
    __self: _this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47,
      columnNumber: 76
    }
  }));
};

var _default = Document;
/**
 * Converts React HTML Components to PDF
 * @param {*} html
 */

exports["default"] = _default;

var htmlToPDF = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(html) {
    var getTextFromChildren;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            getTextFromChildren = function getTextFromChildren(children) {
              var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
              if (!children || !children.map || typeof children === 'string') return children; // if (children[0] && children[0].props && children[0].props.children && typeof children[0].props.children === 'string') return children[0].props.children;

              var listCounter = 1;
              var content = [];
              children.map(function (c) {
                var style = c.key.split('-')[0];
                var text = [];

                switch (style) {
                  case 'list':
                    text.push("".concat(listCounter, ". "));
                    listCounter++;
                    text.push({
                      text: getTextFromChildren(c.props.children, depth + 1)
                    });
                    break;

                  case 'listItem':
                  case 'paragraph':
                    text.push({
                      text: getTextFromChildren(c.props.children, depth + 1)
                    });
                    text.push('\n');
                    break;

                  case 'strong':
                    text = getTextFromChildren(c.props.children, depth + 1);
                    break;

                  default:
                    text.push({
                      text: getTextFromChildren(c.props.children, depth + 1)
                    });
                    text.push('\n');
                }

                content.push({
                  text: text,
                  style: style
                });
                if (depth === 0) content.push('\n');
                return c;
              });
              return content;
            };

            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var content = getTextFromChildren(html.props.children);
              var styles = {
                heading: {
                  fontSize: 22,
                  bold: true
                },
                strong: {
                  bold: true
                }
              };

              var pdfDocGenerator = _pdfmake["default"].createPdf({
                content: content,
                styles: styles
              });

              pdfDocGenerator.getBlob(function (data) {
                // pdfDocGenerator.getBase64((data) => {
                // pdfDocGenerator.getDataUrl((data) => {
                resolve(URL.createObjectURL(data));
              });
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function htmlToPDF(_x2) {
    return _ref3.apply(this, arguments);
  };
}();