import { flatten, union } from "lodash";
import { isFragmentDefinitionNode, isOperationDefinitionNode, isOperationDefinition, } from "./typeGuards";
const findFragmentSpreadInSelectionSet = (selectionSet) => {
    return flatten(selectionSet.selections.map((selection) => {
        if (selection.kind === "FragmentSpread") {
            return [selection.name.value];
        }
        else if (selection.selectionSet) {
            const res = findFragmentSpreadInSelectionSet(selection.selectionSet);
            return res;
        }
        return [];
    }));
};
const findOperationsAndSpreadFragmentsInDocumentNode = (node) => {
    var _a;
    const resolvedOperations = (_a = node.definitions
        .filter(isOperationDefinitionNode)
        .map((definition) => {
        return definition.selectionSet.selections
            .filter(isOperationDefinition)
            .map((selection) => {
            return selection.name.value;
        });
    })) !== null && _a !== void 0 ? _a : [];
    const spreadFragments = flatten(node.definitions
        .filter(isOperationDefinitionNode)
        .filter((definition) => definition.selectionSet)
        .map((definition) => {
        return findFragmentSpreadInSelectionSet(definition.selectionSet);
    }));
    return {
        resolvedOperations: flatten(resolvedOperations),
        spreadFragments,
    };
};
const findDeclaredAndSpreadFragmentsInDocumentNode = (node) => {
    var _a;
    const declaredFragments = (_a = node.definitions
        .filter(isFragmentDefinitionNode)
        .map((definition) => {
        var _a;
        return (_a = definition.name) === null || _a === void 0 ? void 0 : _a.value;
    })) !== null && _a !== void 0 ? _a : [];
    const spreadFragments = flatten(node.definitions
        .filter(isFragmentDefinitionNode)
        .filter((definition) => definition.selectionSet)
        .map((definition) => {
        return findFragmentSpreadInSelectionSet(definition.selectionSet);
    }));
    return {
        declaredFragments,
        spreadFragments,
    };
};
export const parseDocumentNode = (document) => {
    const OperationsAndSpreadFragmentsInDocumentNode = findOperationsAndSpreadFragmentsInDocumentNode(document);
    const declaredAndSpreadFragmentsInDocumentNode = findDeclaredAndSpreadFragmentsInDocumentNode(document);
    return {
        declaredFragments: declaredAndSpreadFragmentsInDocumentNode.declaredFragments,
        resolvedOperations: OperationsAndSpreadFragmentsInDocumentNode.resolvedOperations,
        spreadFragments: union(declaredAndSpreadFragmentsInDocumentNode.spreadFragments, OperationsAndSpreadFragmentsInDocumentNode.spreadFragments),
    };
};
//# sourceMappingURL=findInDocumentNode.js.map