const controller = require('../controllers/cube-controller');

module.exports = (app) => {
    app.get("/create", controller.getCreate);
    app.post("/create", controller.postCreate);
    app.get("/about", controller.getAbout);
    app.get("/details/:id", controller.getDetails);
    app.get("/", controller.getIndex);
    app.get("*", controller.getError);
};