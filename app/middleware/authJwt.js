const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const Member = db.Members;


verifyToken = (req,res, next)=>{
    let token  = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "No token provided!"
        });
    }
    jwt.verify(token,config.secret,(err,decoded)=>{
        console.log(decoded)
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            });
        }
        req.id_user = decoded.id_user
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.id_user).then(user => {
        console.log(user)
        Role.findByPk(user.id_role).then(roles => {
          if (roles.name === "admin") {
            next();
            return;
          }
        res.status(403).send({
          message: "Require Admin Role!"
        });
        return;
      });
    });
  };
const authJwt ={
    verifyToken:verifyToken,
    isAdmin:isAdmin
};

module.exports = authJwt;