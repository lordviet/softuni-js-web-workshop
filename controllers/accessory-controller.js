const models = require("../models");

module.exports = {
    get: {
        createAccessory: function (req, res) {
            return res.render("createAccessory", { user: req.user });
        },
        attachAccessory: function (req, res, next) {
            const { id: cubeId } = req.params;
            models.Cube.findById(cubeId).then(
                cube => Promise.all([cube, models.Accessory.find({ cubes: { $nin: cubeId } })])
            ).then(([cube, filterAccessories]) => {
                res.render('attachAccessory.hbs', {
                    cube,
                    accessories: filterAccessories.length > 0 ? filterAccessories : null
                });
            }).catch(next);
        }
    },
    post: {
        createAccessory: function (req, res) {
            models.Accessory.create(req.body)
                .then(() => {
                    return res.redirect("/");
                });
        },
        attachAccessory: function (req, res, next) {
            const { id } = req.params;
            const { accessory: accessoryId } = req.body;
            Promise.all([
                models.Cube.update({ _id: id }, { $push: { accessories: accessoryId } }),
                models.Accessory.update({ _id: accessoryId }, { $push: { cubes: id } })
            ])
                .then(() => {
                    res.redirect('/');
                })
                .catch(next);
        }
    }
};