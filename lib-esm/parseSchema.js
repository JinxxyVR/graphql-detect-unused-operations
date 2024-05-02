import { find } from "lodash";
const findOperationsInSchemaByType = (schema, type) => {
    var _a;
    const schemaFields = find(schema.__schema.types, (schemaType) => schemaType.name === type);
    return (_a = schemaFields === null || schemaFields === void 0 ? void 0 : schemaFields.fields) !== null && _a !== void 0 ? _a : [];
};
export const parseSchema = (schema) => {
    return [
        ...findOperationsInSchemaByType(schema, "Query"),
        ...findOperationsInSchemaByType(schema, "Mutation"),
    ].map((elem) => elem.name);
};
//# sourceMappingURL=parseSchema.js.map