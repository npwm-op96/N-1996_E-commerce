const {verifySignUp} = require("../middleware");
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        );
        next();
    });
    app.post("/api/auth/signup",
    [
        verifySignUp.checkDupicateUsername,
        verifySignUp.checkRolesExited
    ],
    controller.signup
    );
    app.post("/api/auth/signin",controller.singin);
    app.get(
        "/api/profile",
        [authJwt.verifyToken],
        controller.getprofile
      );
};