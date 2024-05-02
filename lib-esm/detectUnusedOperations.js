var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from "fs";
import { difference, intersection, union } from "lodash";
import * as glob from "glob";
import { loadDocuments } from "@graphql-tools/load";
import { CodeFileLoader } from "@graphql-tools/code-file-loader";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { parseDocumentNode } from "./findInDocumentNode";
import { parseSchema } from "./parseSchema";
import { isPath } from "./typeGuards";
const defaultReduceValues = {
    declaredFragments: [],
    resolvedOperations: [],
    spreadFragments: [],
};
export const readFileToArray = (filename) => {
    var _a;
    try {
        const fileToArray = (_a = fs
            .readFileSync(filename, "utf8")) === null || _a === void 0 ? void 0 : _a.toString().split("\n").filter((line) => {
            return line.length > 0 && !line.match(/#.*/gi);
        });
        return fileToArray;
    }
    catch (e) {
        return [];
    }
};
export const getFilesRecursively = (pattern, ignore, cwd, verbose) => {
    const ignorePattern = isPath(ignore)
        ? readFileToArray(ignore)
        : ignore;
    if (verbose) {
        console.log("\x1b[36m%s\x1b[0m", "Ignored pattern", ignorePattern);
    }
    return glob.sync(pattern, {
        cwd,
        ignore: ignorePattern,
        realpath: true,
    });
};
const getUnionOfFragmentsAndOperations = (acc, { declaredFragments, resolvedOperations, spreadFragments, }) => {
    return {
        declaredFragments: union(acc.declaredFragments, declaredFragments),
        resolvedOperations: union(acc.resolvedOperations, resolvedOperations),
        spreadFragments: union(acc.spreadFragments, spreadFragments),
    };
};
const loadAndParseFile = (verbose) => (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        console.log("\x1b[36m%s\x1b[0m", "File", file);
    }
    try {
        const sources = yield loadDocuments(file, {
            loaders: [new CodeFileLoader(), new GraphQLFileLoader()],
        });
        if (verbose) {
            console.log("\x1b[36m%s\x1b[0m", "Sources", sources);
        }
        const ret = sources
            .filter(({ document }) => document !== undefined)
            .map(({ document }) => {
            return parseDocumentNode(document);
        })
            .reduce((acc, currentFragmentsAndOperations) => {
            return getUnionOfFragmentsAndOperations(acc, currentFragmentsAndOperations);
        }, defaultReduceValues);
        if (verbose) {
            console.log("\x1b[36m%s\x1b[0m", "Ret", ret);
        }
        return ret;
    }
    catch (error) {
        return defaultReduceValues;
    }
});
const getAllFragmentsAndOperations = (files, verbose) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedFiles = yield Promise.all(files.map(loadAndParseFile(verbose)));
    return parsedFiles.reduce((acc, currentFragmentsAndOperations) => getUnionOfFragmentsAndOperations(acc, currentFragmentsAndOperations), defaultReduceValues);
});
export const detectUnusedOperations = (schema, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const { cwd = "", ignore = "./.unused-operations-ignore", pattern = "**/*.{ts,tsx,js}", verbose = false, whitelist = "./.unused-operations-whitelist", } = options;
    const schemaOperationsList = parseSchema(schema);
    if (verbose) {
        console.log("\x1b[36m%s\x1b[0m", "Schema operations list", schemaOperationsList);
    }
    if (!schemaOperationsList.length) {
        throw new Error("Bloody schema without queries or mutations");
    }
    const files = getFilesRecursively(pattern, ignore, cwd, verbose);
    if (verbose) {
        console.log("\x1b[36m%s\x1b[0m", "Files", files);
    }
    const allFragmentsAndOperations = yield getAllFragmentsAndOperations(files, verbose);
    const whitelistFragmentsAndOperations = isPath(whitelist)
        ? readFileToArray(whitelist)
        : whitelist;
    if (verbose) {
        console.log("\x1b[36m%s\x1b[0m", "schemaOperationsList", schemaOperationsList);
        console.log("\x1b[36m%s\x1b[0m", "allFragmentsAndOperations", allFragmentsAndOperations);
        console.log("\x1b[36m%s\x1b[0m", "whitelistCalls", whitelistFragmentsAndOperations);
    }
    return {
        allFragmentsAndOperations,
        unnecessarilyWhitelistedOperations: intersection(whitelistFragmentsAndOperations, allFragmentsAndOperations.resolvedOperations),
        unusedFragments: difference(allFragmentsAndOperations.declaredFragments, allFragmentsAndOperations.spreadFragments),
        unusedOperations: difference(schemaOperationsList, union(allFragmentsAndOperations.resolvedOperations, whitelistFragmentsAndOperations)),
        usedOperations: difference(union(allFragmentsAndOperations.resolvedOperations, whitelistFragmentsAndOperations), schemaOperationsList),
    };
});
//# sourceMappingURL=detectUnusedOperations.js.map