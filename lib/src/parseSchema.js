"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.parseSchema = void 0;
var lodash_1 = require("lodash");
var findOperationsInSchemaByType = function (schema, type) {
    var _a;
    var schemaFields = (0, lodash_1.find)(schema.__schema.types, function (schemaType) { return schemaType.name === type; });
    return (_a = schemaFields === null || schemaFields === void 0 ? void 0 : schemaFields.fields) !== null && _a !== void 0 ? _a : [];
};
var parseSchema = function (schema) {
    return __spreadArray(__spreadArray([], findOperationsInSchemaByType(schema, "Query"), true), findOperationsInSchemaByType(schema, "Mutation"), true).map(function (elem) { return elem.name; });
};
exports.parseSchema = parseSchema;
