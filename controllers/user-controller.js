const User = require("../models/User");
const bcrypt = require('bcrypt');

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
            return res.status(400).send({
                message: "Password must match repeat password"
            });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) { next(err); return; }
            // adding users to db
            // TODO handle duplicates
            User.create({ username, password: hash })
                .then(() => {
                    return res.redirect("/login");
                });

            // catch unique
        });

    }
}

function auth(authLevel) {
    return (req, res, next) => {
        const token = req.cookies['auth_cookie'];
        // const authUser = users.find(user => user.id === req.session.userId);
        const data = jwt.verify(token, secret);
        const authUser = users.find(user => user.id === data.userId);
        if (!authUser) {
            res.status(401).send('401');
            return;
        }
        req.user = authUser;
        next();
    }
}