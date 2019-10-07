const Cube = require("../models/Cube");
// const fs = require("fs");
// const cubes = require("../config/database");

module.exports = {
    getIndex: function (req, res) {
        // Performing a search query
        // let { search, from, to } = req.query;
        // if (search || from || to) {
        //     return res.render("index", { cubes: searchCubes(cubes.slice(), search, from, to) });
        // }
        // fs.readFile("./config/database.json", "utf8", (err, data) => {
        //     if (err) throw err;

        //     return res.render("index", { cubes: JSON.parse(data) });
        // });
        // return res.render("index");
        Cube.find({})
            .then(cubes => {
                return res.render("index", { cubes });
            });
    },
    getCreate: function (req, res) {
        return res.render("create");
    },
    postCreate: function (req, res) {
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
    
    getError: function (req, res) {
        return res.render("404");
    },
}

function searchCubes(cubes, searchName, fromDifficulty, toDifficulty) {
    if (searchName) {
        searchName = searchName.toLowerCase();
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(searchName));
    }
    if (fromDifficulty) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= +fromDifficulty);
    }
    if (toDifficulty) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= +toDifficulty);
    }

    return cubes;
}
