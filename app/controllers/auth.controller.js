const modules = require("../module");
const module_user = modules.module_user
const db = require("../models");
const config =require("../config/auth.config");
const Member = db.Members;
const Profile = db.Profile
const Role =db.Roles;

const Op =db.Sequelize.Op;

var jwt =require("jsonwebtoken");
var bcrypt= require("bcryptjs");

exports.signup =(req ,res)=>{
    var id = Math.floor(Date.now() / 1000)
    Profile.create({
      id_profile: id,
      fname:req.body.fname,
      lname:req.body.lname,
      tel:req.body.tel,
    })
    Member.create({
        username:req.body.username,
        password:bcrypt.hashSync(req.body.password,8),
        id_profile:id

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
                    res.send({message:"User was registered successfully !"});
            });
        }else{
            res.send({message:"User was registered successfully!"});
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
            return res.status(400).send({message:"User Not found."});
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
        var token = jwt.sign({id_user:member.id_user},config.secret,{
            expiresIn:86400
        });

        var authorities =[];
        Role.findOne({
            where: {
                id_role: member.id_role
              }
          }).then(roles => {
              authorities.push("ROLE_" + roles.name.toUpperCase());
              res.status(200).send({
              id_user: member.id_user,
              username: member.username,
            //   email: user.email,
              roles: authorities,
              accessToken: token
              
            });
          });
    })
    .catch(err=>{
        res.status(500).send({message:err.message});
    });
};
exports.getprofile = async (req, res) => {
    const id_user = await req.query.id_user
    console.log(id_user)
    const user = await module_user.getuser(id_user)
    // console.log(user)
    const profile =  await module_user.getprofile(user.id_profile)
    res.send(profile)
  };
