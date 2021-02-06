const db = require("../models");
const config =require("../config/auth.config");
const Member = db.Members;
const Role =db.Roles;

const Op =db.Sequelize.Op;

var jwt =require("jsonwebtoken");
var bcrypt= require("bcryptjs");

exports.signup =(req ,res)=>{
    Member.create({
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password,8)
    })
    .then(member=>{
        if(req.body.roles){
            Role.findAll({
                where:{
                    name:{
                        [Op.or]:req.body.roles
                    }
                }
            }).then(roles=>{
                member.setRoles(roles).then(()=>{
                    res.send({message:"User was registered successfully !"});
                });
            });
        }else{
            member.setRoles([1]).then(()=>{
            res.send({message:"User was registered successfully!"});
        });
        }
    })
    .catch(err=>{
        res.status(500).send({message:err.message});
    });
};
exports.singin =(req,res)=>{
    Member.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(member=>{
        if(!member){
            return res.status(400).send({message:"USer Not found."});
        }
        var passwordInValid = bcrypt.compareSync(
            req.body.password,
            member.password
        );
        if(!passwordInValid){
            return res.status(401).send({
                accessToken:null,
                message:"Invalid Password!"
            });
        }
        var token = jwt.sign({id:member.id},config.secret,{
            expiresIn:86400
        });

        var authoritites =[];
        member.getRoles().then(roles=>{
            for(let i=0; i<roles.length; i++){
                authoritites.push("ROLE_"+roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id:member.id,
                username:member.username,
                roles:authoritites,
                accessToken:token
            });
        });
    })
    .catch(err=>{
        res.status(500).send({message:err.message});
    });
};
