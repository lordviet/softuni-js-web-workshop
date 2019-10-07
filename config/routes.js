const cubeController = require("../controllers/cube-controller");
const accessoryController = require("../controllers/accessory-controller")

module.exports = (app) => {
    app.get("/create", cubeController.getCreate);
    app.post("/create", cubeController.postCreate);
    app.get("/about", cubeController.getAbout);
    app.get("/details/:id", cubeController.getDetails);
    app.get("/create/accessory", accessoryController.getCreateAccessory);
    app.get("/attach/accessory/:id", accessoryController.getAttachAccessory)
    app.get("/", cubeController.getIndex);
    app.get("*", cubeController.getError);
};