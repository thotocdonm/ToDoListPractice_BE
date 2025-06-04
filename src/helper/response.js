
module.exports = (res, next, statusCode, message, status, data = null) => {
    return res.status(statusCode).json({
        status: status || 'SUCCESS',
        code: statusCode,
        data,
        message
    });
};