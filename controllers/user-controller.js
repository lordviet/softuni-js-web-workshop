const User = require("../models/User");

module.exports = {
    getLogin: function (req, res) {
        return res.render("loginPage");
    }, 
    getRegister: function(req, res){
        return res.render("registerPage");
    }
}