const Cube = require("../models/Cube");

module.exports = {
    getIndex: function (req, res) {
        const { search, from, to } = req.query;
        const user = req.user;
        Cube.find(searchCubes(search, from, to))
            .then(cubes => {
                return res.render("index", { cubes, user });
            });
    },
    getCreate: function (req, res) {
        const user = req.user;
        return res.render("create", { user });
    },
    postCreate: function (req, res) {
        const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
        const { user } = req;
        Cube.create({ name, description, imageUrl, difficultyLevel, creatorId: user._id })
            .then(() => {
                return res.redirect('/');
            });
    },
    getAbout: function (req, res) {
        return res.render("about", { user: req.user });
    },
    getDetails: function (req, res) {
        let id = req.params.id;
        const { user } = req;
        // populate to get the info of accessories
        Cube.findById(id).populate("accessories").then((cube) => {
            return res.render("details", { cube, user });
        });
    },
    getDeleteCube: function (req, res) {
        return res.render("deleteCubePage"); // add id
    },
    getEdit: function (req, res) {
        return res.render("editCubePage"); // add id
    },
    getError: function (req, res) {
        return res.render("404");
    },
}

function searchCubes(search, from, to) {
    let query = {};
    if (search) {
        query = { ...query, name: { $regex: search, $options: "i" } };
    }
    if (to) {
        query = {
            ...query,
            difficultyLevel: { ...query.difficultyLevel, $lte: +to }
        };
    }
    if (from) {
        query = {
            ...query,
            difficultyLevel: { ...query.difficultyLevel, $gte: +from }
        };
    }

    return query;
}
