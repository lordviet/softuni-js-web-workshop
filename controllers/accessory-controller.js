const { Accessory, Cube } = require('../models');

module.exports = {
    getCreateAccessory: function (req, res) {
        return res.render("createAccessory");
    },

    postCreateAccessory: function (req, res) {
        Accessory.create(req.body)
            .then(() => {
                return res.redirect("/");
            });
    },
    getAttachAccessory: function (req, res) {
        let id = req.params.id;
        Cube.findById(id).then((cube) => {
            return res.render("attachAccessory", { cube });
        });
    }
};