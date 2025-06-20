const jwt = require('jsonwebtoken');
const { errorResponse } = require('./responseHelper');

const JWT_SECRET = process.env.JWT_SECRET;


/**
 * USER AUTH MIDDLEWARE
 */
const userAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // e.g., decoded could have userId, role, etc.
        next();
    } catch (err) {
        // return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
        return res.status(403).json(errorResponse(403, 'Forbidden: Invalid or expired token. Please login again', err));
    }
};

module.exports = { userAuth };
