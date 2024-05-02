"use strict";
exports.__esModule = true;
exports.coloredLog = void 0;
var coloredLog = function (message, isRed) {
    console.log("\u001B[".concat(isRed ? 31 : 32, "m%s\u001B[0m"), message);
};
exports.coloredLog = coloredLog;
