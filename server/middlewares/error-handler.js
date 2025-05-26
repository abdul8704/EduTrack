const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: err.message || 'An unexpected error occurred'
    })
}

module.exports = errorHandler;
