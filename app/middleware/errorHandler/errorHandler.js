function errorHandler(err, req, res, next) {
    console.error(err.stack);

    res.status(err.code|| 500).json({
        error: err.message,
        downStreamStatusCode: err.code
    });
}

module.exports = errorHandler;