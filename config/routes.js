const cubeController = require("../controllers/cube-controller");
const accessoryController = require("../controllers/accessory-controller");
const userController = require("../controllers/user-controller");
const { auth } = require("../utils");

module.exports = (app) => {
    app.get("/create", auth(), cubeController.getCreate);
    app.post("/create", auth(), cubeController.postCreate);
    app.get("/login", userController.getLogin);
    app.post("/login", userController.postLogin);
    app.get("/register", userController.getRegister);
    app.post("/register", userController.postRegister);
    app.get("/logout", userController.logout);
    app.get("/about", auth(false), cubeController.getAbout);
    app.get("/details/:id", auth(false), cubeController.getDetails);
    app.get("/create/accessory", auth(), accessoryController.getCreateAccessory);
    app.post("/create/accessory", auth(), accessoryController.postCreateAccessory);
    app.get("/attach/accessory/:id", accessoryController.getAttachAccessory);
    app.post("/attach/accessory/:id", accessoryController.postAttachAccessory);
    app.get("/delete/:id", auth(), cubeController.getDeleteCube);
    app.post("/delete/:id", auth(), cubeController.postDeleteCube);
    app.get("/edit/:id", auth(), cubeController.getEdit); 
    app.post("/edit/:id", auth(), cubeController.postEdit);
    app.get("/", auth(false), cubeController.getIndex);
    app.get("*", cubeController.getError);
};