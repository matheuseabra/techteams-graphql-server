module.exports = (val, next) => {
    if (!val || val === undefined || val === null) {
        throw new Error(`Could not find value ${val}`);
    }
    next();
};