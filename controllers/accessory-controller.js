const { accessoryModel, cubeModel } = require('../models');

module.exports = {
    getCreateAccessory: function (req, res) {
        return res.render("createAccessory");
    },
    getAttachAccessory: function (req, res) {
        let id = req.params.id;
        Cube.findById(id).then((cube) => {
            return res.render("attachAccessory", { cube });
        });
    }
};