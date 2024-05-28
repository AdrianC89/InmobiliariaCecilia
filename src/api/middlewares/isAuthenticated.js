const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (!err) {
                res.locals.isAuthenticated = true;
                res.locals.user = user;
            } else {
                res.locals.isAuthenticated = false;
            }
        });
    } else {
        res.locals.isAuthenticated = false;
    }
    next();
}

module.exports = isAuthenticated;