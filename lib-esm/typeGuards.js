export const isFragmentDefinitionNode = (definitionNode) => definitionNode.kind === "FragmentDefinition";
export const isOperationDefinitionNode = (definitionNode) => definitionNode.kind === "OperationDefinition";
export const isOperationDefinition = (selection) => selection.kind === "Field";
export const isPath = (pathOrArray) => typeof pathOrArray === "string";
//# sourceMappingURL=typeGuards.js.map