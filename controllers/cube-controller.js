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
        let isCreator = false;

        Cube.findById(id).populate("accessories").then((cube) => {
            isCreator = cube.creatorId === user.id;
            return res.render("details", { cube, user, isCreator });
        });
    },
    getDeleteCube: function (req, res) {
        return res.render("deleteCubePage"); // add id
    },
    getEdit: function (req, res) {
        let id = req.params.id;
        const { user } = req;
        const options = {
            "1": "1 - Very Easy",
            "2": "2 - Easy",
            "3": "3 - Medium (Standard 3x3)",
            "4": "4 - Intermediate",
            "5": "5 - Expert",
            "6": "6 - Hardcore"
        };

        Cube.findOne({ _id: id, creatorId: user.id }).then(cube => {
            return res.render("editCubePage", { cube, user, status: options[cube.difficultyLevel] });

        });
    },

    postEdit: function (req, res) {
        const id = req.params.id;
        const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
        Cube.updateOne({ _id: id }, { name, description, imageUrl, difficultyLevel })
            .then(() => {
                res.redirect("/");
            });
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
