var AuthenticationController = require("../controllers/AuthenticationController");
var AuthenticationControllerPolicy = require("../policies/AuthenticationControllerPolicy");

module.exports = function(app) {
    app.post("/register", 
        AuthenticationControllerPolicy.register,
        AuthenticationController.register);

    app.post("/login", AuthenticationController.login);
}