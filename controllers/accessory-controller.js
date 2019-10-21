const { Accessory, Cube } = require('../models');

module.exports = {
    getCreateAccessory: function (req, res) {
        return res.render("createAccessory", { user: req.user });
    },

    postCreateAccessory: function (req, res) {
        Accessory.create(req.body)
            .then(() => {
                return res.redirect("/");
            });
    },
    getAttachAccessory: function (req, res, next) {
        const { id: cubeId } = req.params;
        Cube.findById(cubeId).then(
            cube => Promise.all([cube, Accessory.find({ cubes: { $nin: cubeId } })])
        ).then(([cube, filterAccessories]) => {
            res.render('attachAccessory.hbs', {
                cube,
                accessories: filterAccessories.length > 0 ? filterAccessories : null
            });
        }).catch(next);
    },

    postAttachAccessory: function (req, res, next) {
        const { id } = req.params;
        const { accessory: accessoryId } = req.body;
        Promise.all([
            Cube.update({ _id: id }, { $push: { accessories: accessoryId } }),
            Accessory.update({ _id: accessoryId }, { $push: { cubes: id } })
        ])
            .then(() => {
                res.redirect('/');
            })
            .catch(next);
    }
};