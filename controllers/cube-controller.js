const Cube = require("../models/Cube");
const fs = require("fs");
const cubes = require("../config/database");

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
                console.log(cubes);
                return res.render("index", { cubes });
            });
    },
    getCreate: function (req, res) {
        return res.render("create");
    },
    postCreate: function (req, res) {
        // console.log(req.body);
        // fs.readFile("./config/database.json", "utf8", (err, data) => {
        //     if (err) throw err;
        //     let database = JSON.parse(data);
        //     let id = database.length + 1;
        //     let cube = new Cube(id, ...Object.values(req.body));
        //     database.push(cube);
        //     let json = JSON.stringify(database);
        //     fs.writeFile("./config/database.json", json, "utf-8", () => console.log("The Cube was successfully added!"))
        // });
        Cube.create(req.body)
            .then(() => {
                return res.redirect('/');
            });
        // return res.redirect("/");
    },
    getAbout: function (req, res) {
        return res.render("about");
    },
    getDetails: function (req, res) {
        let id = Number(req.params.id);
        let cube = cubes.filter(cube => cube.id === id)[0];
        return res.render("details", { cube });
    },
    getError: function (req, res) {
        return res.render("404");
    }
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
