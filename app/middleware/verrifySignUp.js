const db = require("../models");
const ROLES = db.ROLES;
const Member  = db.Members;

checkDupicateUsername =(req ,res,next)=>{
    Member.findOne({
        where:{
            username:req.body.username
        }
    }).then(member=>{
        if(member){
            res.status(400).send({
                message:"Failed Username is already in use !"
            });
            return;
        }
        next();
    });
};

checkRolesExited = (req,res,next)=>{
    if(req.body.roles){
        for(let i = 0; i<req.body.roles.length; i++){
            if(!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message:"Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignUp={
    checkDupicateUsername:checkDupicateUsername,
    checkRolesExited:checkRolesExited
};
module.exports=verifySignUp