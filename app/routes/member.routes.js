const {authJwt}=require("../middleware");
const controller = require("../controllers/member.controller");

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        );
        next();
    });
    app.get("/api/test/all",controller.allAccess);
    app.get(
        "/api/test/member",
        [authJwt.verifyToken],
        controller.memberBoard
    );
    app.get("/api/tes/mod",
    [authJwt.verifyToken,authJwt.isAdmin],
    controller.adminBoard
    );
};