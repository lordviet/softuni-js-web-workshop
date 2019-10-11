const Cube = require("../models/Cube");

module.exports = {
    getIndex: function (req, res) {
        const { search, from, to } = req.query;
        Cube.find(searchCubes(search, from, to))
            .then(cubes => {
                return res.render("index", { cubes });
            });
    },
    getCreate: function (req, res) {
        return res.render("create");
    },
    postCreate: function (req, res) {
        // TODO fix this, add null values just in case
        Cube.create(req.body)
            .then(() => {
                return res.redirect('/');
            });
    },
    getAbout: function (req, res) {
        return res.render("about");
    },
    getDetails: function (req, res) {
        let id = req.params.id;
        // populate to get the info of accessories
        Cube.findById(id).populate("accessories").then((cube) => {
            return res.render("details", { cube });
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
