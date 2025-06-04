const jwt = require('jsonwebtoken');
const response = require('../helper/response')

const authenticateToken = (req, res, next) => {
    // Get token from header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"

    if (!token) {
        return response(res,next,401,'No token provided','ERROR',null)

    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return response(res,next,403,'Invalid or expired token','ERROR',null)
        }

        // Attach user data to the request
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;