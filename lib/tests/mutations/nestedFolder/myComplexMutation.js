"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.myComplexMutation = void 0;
var graphql_tag_1 = require("graphql-tag");
var myDeepObjectFragment_1 = require("../../fragments/myDeepObjectFragment");
exports.myComplexMutation = (0, graphql_tag_1["default"])(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation complexMutation($scalarField: String!) {\n    complexMutation(scalarField: $scalarField) {\n      id\n      scalarField\n      subObject {\n        ...deepObjectFragment\n        age\n      }\n    }\n  }\n  ", "\n"], ["\n  mutation complexMutation($scalarField: String!) {\n    complexMutation(scalarField: $scalarField) {\n      id\n      scalarField\n      subObject {\n        ...deepObjectFragment\n        age\n      }\n    }\n  }\n  ", "\n"])), myDeepObjectFragment_1.myDeepObjectFragment);
var templateObject_1;
