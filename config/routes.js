const {cubeController, accessoryController, userController} = require("../controllers/index");
const { auth } = require("../utils");

module.exports = (app) => {
    app.get("/create", auth(), cubeController.get.create);
    app.post("/create", auth(), cubeController.post.create);
    
    app.get("/login", auth(false), userController.get.login);
    app.post("/login", auth(false), userController.post.login);
    
    app.get("/register", auth(false), userController.get.register);
    app.post("/register", auth(false), userController.post.register);
    
    app.get("/logout", auth(), userController.get.logout);
    app.get("/about", auth(false), cubeController.get.about);
    app.get("/details/:id", auth(false), cubeController.get.details);
    
    app.get("/create/accessory", auth(), accessoryController.get.createAccessory);
    app.post("/create/accessory", auth(), accessoryController.post.createAccessory);
    
    app.get("/attach/accessory/:id", accessoryController.get.attachAccessory);
    app.post("/attach/accessory/:id", accessoryController.post.attachAccessory);
    
    app.get("/delete/:id", auth(), cubeController.get.delete);
    app.post("/delete/:id", auth(), cubeController.post.delete);

    app.get("/edit/:id", auth(), cubeController.get.edit); 
    app.post("/edit/:id", auth(), cubeController.post.edit);

    app.get("/", auth(false), cubeController.get.index);
    app.get("*", auth(false), cubeController.get.error);
};