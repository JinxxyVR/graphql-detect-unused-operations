"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.myDeepObjectFragment = exports.myEvenDeeperObjectFragment = void 0;
var graphql_tag_1 = require("graphql-tag");
exports.myEvenDeeperObjectFragment = (0, graphql_tag_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment evenDeeperObjectFragment on MyEvenDeeperObject {\n    id\n  }\n"], ["\n  fragment evenDeeperObjectFragment on MyEvenDeeperObject {\n    id\n  }\n"])));
exports.myDeepObjectFragment = (0, graphql_tag_1["default"])(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  fragment deepObjectFragment on MyDeepObject {\n    evenDeeperObject {\n      ...evenDeeperObjectFragment\n    }\n  }\n  ", "\n"], ["\n  fragment deepObjectFragment on MyDeepObject {\n    evenDeeperObject {\n      ...evenDeeperObjectFragment\n    }\n  }\n  ", "\n"])), exports.myEvenDeeperObjectFragment);
var templateObject_1, templateObject_2;
