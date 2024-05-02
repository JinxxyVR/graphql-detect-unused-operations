"use strict";
exports.__esModule = true;
exports.parseDocumentNode = void 0;
var lodash_1 = require("lodash");
var typeGuards_1 = require("./typeGuards");
var findFragmentSpreadInSelectionSet = function (selectionSet) {
    return (0, lodash_1.flatten)(selectionSet.selections.map(function (selection) {
        if (selection.kind === "FragmentSpread") {
            return [selection.name.value];
        }
        else if (selection.selectionSet) {
            var res = findFragmentSpreadInSelectionSet(selection.selectionSet);
            return res;
        }
        return [];
    }));
};
var findOperationsAndSpreadFragmentsInDocumentNode = function (node) {
    var _a;
    var resolvedOperations = (_a = node.definitions
        .filter(typeGuards_1.isOperationDefinitionNode)
        .map(function (definition) {
        return definition.selectionSet.selections
            .filter(typeGuards_1.isOperationDefinition)
            .map(function (selection) {
            return selection.name.value;
        });
    })) !== null && _a !== void 0 ? _a : [];
    var spreadFragments = (0, lodash_1.flatten)(node.definitions
        .filter(typeGuards_1.isOperationDefinitionNode)
        .filter(function (definition) { return definition.selectionSet; })
        .map(function (definition) {
        return findFragmentSpreadInSelectionSet(definition.selectionSet);
    }));
    return {
        resolvedOperations: (0, lodash_1.flatten)(resolvedOperations),
        spreadFragments: spreadFragments
    };
};
var findDeclaredAndSpreadFragmentsInDocumentNode = function (node) {
    var _a;
    var declaredFragments = (_a = node.definitions
        .filter(typeGuards_1.isFragmentDefinitionNode)
        .map(function (definition) {
        var _a;
        return (_a = definition.name) === null || _a === void 0 ? void 0 : _a.value;
    })) !== null && _a !== void 0 ? _a : [];
    var spreadFragments = (0, lodash_1.flatten)(node.definitions
        .filter(typeGuards_1.isFragmentDefinitionNode)
        .filter(function (definition) { return definition.selectionSet; })
        .map(function (definition) {
        return findFragmentSpreadInSelectionSet(definition.selectionSet);
    }));
    return {
        declaredFragments: declaredFragments,
        spreadFragments: spreadFragments
    };
};
var parseDocumentNode = function (document) {
    var OperationsAndSpreadFragmentsInDocumentNode = findOperationsAndSpreadFragmentsInDocumentNode(document);
    var declaredAndSpreadFragmentsInDocumentNode = findDeclaredAndSpreadFragmentsInDocumentNode(document);
    return {
        declaredFragments: declaredAndSpreadFragmentsInDocumentNode.declaredFragments,
        resolvedOperations: OperationsAndSpreadFragmentsInDocumentNode.resolvedOperations,
        spreadFragments: (0, lodash_1.union)(declaredAndSpreadFragmentsInDocumentNode.spreadFragments, OperationsAndSpreadFragmentsInDocumentNode.spreadFragments)
    };
};
exports.parseDocumentNode = parseDocumentNode;
