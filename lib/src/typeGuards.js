"use strict";
exports.__esModule = true;
exports.isPath = exports.isOperationDefinition = exports.isOperationDefinitionNode = exports.isFragmentDefinitionNode = void 0;
var isFragmentDefinitionNode = function (definitionNode) {
    return definitionNode.kind === "FragmentDefinition";
};
exports.isFragmentDefinitionNode = isFragmentDefinitionNode;
var isOperationDefinitionNode = function (definitionNode) {
    return definitionNode.kind === "OperationDefinition";
};
exports.isOperationDefinitionNode = isOperationDefinitionNode;
var isOperationDefinition = function (selection) { return selection.kind === "Field"; };
exports.isOperationDefinition = isOperationDefinition;
var isPath = function (pathOrArray) { return typeof pathOrArray === "string"; };
exports.isPath = isPath;
