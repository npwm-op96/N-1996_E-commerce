const db = require("../models");
class modules_user {
    getuser = (id)=>{
        return db.Members.findByPk(id)
    }
    getprofile = (id = null)=>{
        return db.Profile.findOne({
            where: {
                id_profile: id
            }
        })
    }
}
// const module_user = {
//     getprofile:getprofile
// }
module.exports = new modules_user();
