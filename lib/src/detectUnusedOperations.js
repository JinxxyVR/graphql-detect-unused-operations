"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.detectUnusedOperations = exports.getFilesRecursively = exports.readFileToArray = void 0;
var fs = require("fs");
var lodash_1 = require("lodash");
var glob = require("glob");
var load_1 = require("@graphql-tools/load");
var code_file_loader_1 = require("@graphql-tools/code-file-loader");
var graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
var findInDocumentNode_1 = require("./findInDocumentNode");
var parseSchema_1 = require("./parseSchema");
var typeGuards_1 = require("./typeGuards");
var defaultReduceValues = {
    declaredFragments: [],
    resolvedOperations: [],
    spreadFragments: []
};
var readFileToArray = function (filename) {
    var _a;
    try {
        var fileToArray = (_a = fs
            .readFileSync(filename, "utf8")) === null || _a === void 0 ? void 0 : _a.toString().split("\n").filter(function (line) {
            return line.length > 0 && !line.match(/#.*/gi);
        });
        return fileToArray;
    }
    catch (e) {
        return [];
    }
};
exports.readFileToArray = readFileToArray;
var getFilesRecursively = function (pattern, ignore, cwd, verbose) {
    var ignorePattern = (0, typeGuards_1.isPath)(ignore)
        ? (0, exports.readFileToArray)(ignore)
        : ignore;
    if (verbose) {
        console.log("\x1b[36m%s\x1b[0m", "Ignored pattern", ignorePattern);
    }
    return glob.sync(pattern, {
        cwd: cwd,
        ignore: ignorePattern,
        realpath: true
    });
};
exports.getFilesRecursively = getFilesRecursively;
var getUnionOfFragmentsAndOperations = function (acc, _a) {
    var declaredFragments = _a.declaredFragments, resolvedOperations = _a.resolvedOperations, spreadFragments = _a.spreadFragments;
    return {
        declaredFragments: (0, lodash_1.union)(acc.declaredFragments, declaredFragments),
        resolvedOperations: (0, lodash_1.union)(acc.resolvedOperations, resolvedOperations),
        spreadFragments: (0, lodash_1.union)(acc.spreadFragments, spreadFragments)
    };
};
var loadAndParseFile = function (verbose) {
    return function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var sources, ret, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (verbose) {
                        console.log("\x1b[36m%s\x1b[0m", "File", file);
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, load_1.loadDocuments)(file, {
                            loaders: [new code_file_loader_1.CodeFileLoader(), new graphql_file_loader_1.GraphQLFileLoader()]
                        })];
                case 2:
                    sources = _a.sent();
                    if (verbose) {
                        console.log("\x1b[36m%s\x1b[0m", "Sources", sources);
                    }
                    ret = sources
                        .filter(function (_a) {
                        var document = _a.document;
                        return document !== undefined;
                    })
                        .map(function (_a) {
                        var document = _a.document;
                        return (0, findInDocumentNode_1.parseDocumentNode)(document);
                    })
                        .reduce(function (acc, currentFragmentsAndOperations) {
                        return getUnionOfFragmentsAndOperations(acc, currentFragmentsAndOperations);
                    }, defaultReduceValues);
                    if (verbose) {
                        console.log("\x1b[36m%s\x1b[0m", "Ret", ret);
                    }
                    return [2 /*return*/, ret];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, defaultReduceValues];
                case 4: return [2 /*return*/];
            }
        });
    }); };
};
var getAllFragmentsAndOperations = function (files, verbose) { return __awaiter(void 0, void 0, void 0, function () {
    var parsedFiles;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(files.map(loadAndParseFile(verbose)))];
            case 1:
                parsedFiles = _a.sent();
                return [2 /*return*/, parsedFiles.reduce(function (acc, currentFragmentsAndOperations) {
                        return getUnionOfFragmentsAndOperations(acc, currentFragmentsAndOperations);
                    }, defaultReduceValues)];
        }
    });
}); };
var detectUnusedOperations = function (schema, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var _a, cwd, _b, ignore, _c, pattern, _d, verbose, _e, whitelist, schemaOperationsList, files, allFragmentsAndOperations, whitelistFragmentsAndOperations;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = options.cwd, cwd = _a === void 0 ? "" : _a, _b = options.ignore, ignore = _b === void 0 ? "./.unused-operations-ignore" : _b, _c = options.pattern, pattern = _c === void 0 ? "**/*.{ts,tsx,js}" : _c, _d = options.verbose, verbose = _d === void 0 ? false : _d, _e = options.whitelist, whitelist = _e === void 0 ? "./.unused-operations-whitelist" : _e;
                    schemaOperationsList = (0, parseSchema_1.parseSchema)(schema);
                    if (verbose) {
                        console.log("\x1b[36m%s\x1b[0m", "Schema operations list", schemaOperationsList);
                    }
                    if (!schemaOperationsList.length) {
                        throw new Error("Bloody schema without queries or mutations");
                    }
                    files = (0, exports.getFilesRecursively)(pattern, ignore, cwd, verbose);
                    if (verbose) {
                        console.log("\x1b[36m%s\x1b[0m", "Files", files);
                    }
                    return [4 /*yield*/, getAllFragmentsAndOperations(files, verbose)];
                case 1:
                    allFragmentsAndOperations = _f.sent();
                    whitelistFragmentsAndOperations = (0, typeGuards_1.isPath)(whitelist)
                        ? (0, exports.readFileToArray)(whitelist)
                        : whitelist;
                    if (verbose) {
                        console.log("\x1b[36m%s\x1b[0m", "schemaOperationsList", schemaOperationsList);
                        console.log("\x1b[36m%s\x1b[0m", "allFragmentsAndOperations", allFragmentsAndOperations);
                        console.log("\x1b[36m%s\x1b[0m", "whitelistCalls", whitelistFragmentsAndOperations);
                    }
                    return [2 /*return*/, {
                            allFragmentsAndOperations: allFragmentsAndOperations,
                            unnecessarilyWhitelistedOperations: (0, lodash_1.intersection)(whitelistFragmentsAndOperations, allFragmentsAndOperations.resolvedOperations),
                            unusedFragments: (0, lodash_1.difference)(allFragmentsAndOperations.declaredFragments, allFragmentsAndOperations.spreadFragments),
                            unusedOperations: (0, lodash_1.difference)(schemaOperationsList, (0, lodash_1.union)(allFragmentsAndOperations.resolvedOperations, whitelistFragmentsAndOperations)),
                            usedOperations: (0, lodash_1.difference)((0, lodash_1.union)(allFragmentsAndOperations.resolvedOperations, whitelistFragmentsAndOperations), schemaOperationsList)
                        }];
            }
        });
    });
};
exports.detectUnusedOperations = detectUnusedOperations;
