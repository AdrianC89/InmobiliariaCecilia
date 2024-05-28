require('dotenv').config();
const jwt = require('jsonwebtoken');

async function authRequired(req, res, next) {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = user;
        next();
    });
}

module.exports = {
    authRequired
};
