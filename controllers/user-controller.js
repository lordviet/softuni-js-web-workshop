const models = require("../models");
const utils = require("../utils");
const appConfig = require("../app-config");

module.exports = {
    get: {
        login: function (req, res) {
            return res.render("login");
        },
        register: function (req, res) {
            return res.render("register");
        },
        logout: function (req, res) {
            const token = req.cookies[appConfig.authCookieName];
            models.TokenBlacklist.create({ token }).then(() => {
                res.clearCookie(appConfig.authCookieName).redirect("/");
            });
        }
    },

    post: {
        login: function (req, res) {
            const { username, password } = req.body;
            models.User.findOne({ username })
                .then(user => Promise.all([user, user ? user.matchPassword(password) : false]))
                .then(([user, match]) => {
                    if (!match) {
                        return res.render("login", { message: "Wrong password or username!" });
                    }
                    const token = utils.jwt.createToken({ id: user._id });
                    res.cookie(appConfig.authCookieName, token).redirect("/");
                });
        },

        register: function (req, res, next) {
            const { username, password, repeatPassword } = req.body;
            if (password !== repeatPassword) {
                return res.render("register", {
                    errors: {
                        repeatPassword: "Password and repeat password don't match"
                    }
                });
            }

            models.User.create({ username, password }).then(() => {
                return res.redirect("/login");
            }).catch(err => {
                if (err.name === "MongoError" && err.code === 11000) {
                    return res.render("register", {
                        errors: {
                            username: "Username already exists!"
                        }
                    });
                }
                next(err);
            });

        }
    }
}
