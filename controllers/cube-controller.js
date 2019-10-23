const Cube = require("../models/Cube");

module.exports = {
    get: {
        index: function (req, res) {
            const { search, from, to } = req.query;
            const user = req.user;
            Cube.find(searchCubes(search, from, to))
                .then(cubes => {
                    return res.render("index", { cubes, user });
                });
        },
        create: function (req, res) {
            const user = req.user;
            return res.render("create", { user });
        },
        about: function (req, res) {
            return res.render("about", { user: req.user });
        },
        details: function (req, res) {
            let id = req.params.id;
            const { user } = req;
            Cube.findById(id).populate("accessories").then(cube => {
                let isCreator = user ? cube.creatorId === user.id : false; 
                return res.render("details", { cube, user, isCreator });
            }).catch(err => {console.log(err.message)})
        },
        delete: function (req, res) {
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
                return res.render("deleteCubePage", { cube, user, status: options[cube.difficultyLevel] });
            });
        },
        edit: function (req, res) {
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
                return res.render("editCubePage", { cube, user, difficultyLevel:cube.difficultyLevel, status: options[cube.difficultyLevel] });

            });
        },

        error: function (req, res) {
            return res.render("404");
        }
    },

    post: {
        create: function (req, res) {
            const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
            const { user } = req;
            Cube.create({ name, description, imageUrl, difficultyLevel, creatorId: user._id })
                .then(() => {
                    return res.redirect('/');
                });
        },
        delete: function (req, res) {
            let id = req.params.id;
            const { user } = req;

            Cube.deleteOne({ _id: id, creatorId: user._id })
                .then(() => { res.redirect("/"); })
        },

        edit: function (req, res) {
            const id = req.params.id;
            const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
            Cube.updateOne({ _id: id }, { name, description, imageUrl, difficultyLevel })
                .then(() => {
                    return res.redirect("/");
                });
        }
    }
};

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
