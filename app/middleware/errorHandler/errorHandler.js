function errorHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(err.code || 500).json({
        error: err.message,
        code: err.code
    });
}

module.exports = errorHandler;