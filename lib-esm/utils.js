export const coloredLog = (message, isRed) => {
    console.log(`\x1b[${isRed ? 31 : 32}m%s\x1b[0m`, message);
};
//# sourceMappingURL=utils.js.map