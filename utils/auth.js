const jwt = require("./jwt");
const appConfig = require("../app-config");
const models = require("../models");

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        const token = req.cookies[appConfig.authCookieName] || "";
        Promise.all([
            jwt.verifyToken(token),
            models.TokenBlacklist.findOne({ token })
        ]).then(([data, blacklistedToken]) => {
            if (blacklistedToken) { return Promise.reject(new Error("Blacklisted token")); }
            models.User.findById(data.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            if (!redirectUnauthenticated) { next(); return; }
            if ([
                "token expired",
                "blacklisted token",
                "jwt must be provided"
            ].includes(err.message)) {
                return res.redirect("/login");
            }
            next(err);
        });
    };
}

module.exports = auth;