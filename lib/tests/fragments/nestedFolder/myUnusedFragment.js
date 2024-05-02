"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.myUnusedFragment = void 0;
var graphql_tag_1 = require("graphql-tag");
exports.myUnusedFragment = (0, graphql_tag_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment unusedFragment on MyObject {\n    scalarField\n  }\n"], ["\n  fragment unusedFragment on MyObject {\n    scalarField\n  }\n"])));
var templateObject_1;
