const User = require("../models/User");

module.exports = {
    getLogin: function (req, res) {
        return res.render("loginPage");
    },
    getRegister: function (req, res) {
        return res.render("registerPage");
    },
    postRegister: function (req, res, next) {
        const { username, password, repeatPassword } = req.body;
        if (password !== repeatPassword) {
            return res.render("register", {
                errors: {
                    repeatPassword: "Password and repeat password don't match"
                }
            })
        }

        User.create({ username, password }).then(() => {
            return res.redirect("/login");
        }).catch(err => {
            if (err.name === "MongoError" && err.code === 11000) {
                return res.render("register", {
                    errors: {
                        username: "Username already exists!"
                    }
                });
                // return;
            }
            next(err);
        });

    }
}
