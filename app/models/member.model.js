
module.exports = (sequelize,Sequelize)=>{
  const Profile = require('../models/profile.model.js')(sequelize,Sequelize);
  const Role = require('./role.model.js')(sequelize,Sequelize);
  const Orders = require('../models/order.model.js')(sequelize,Sequelize);
  const User = sequelize.define('members',{
      id_user:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement: true,
      },
      username:{
          type:Sequelize.STRING
      },
      password:{
          type:Sequelize.STRING
      },
      id_profile:{
          type:Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'NO ACTION',
          onDelete: 'NO ACTION'
      },
      id_role:{
          type:Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1
      }
  });
  Orders.belongsTo(User, {foreignKey: 'id_user', targetKey: 'id_user'});
  Profile.hasOne(User, { foreignKey: 'id_profile' })
  Role.hasOne(User, { foreignKey: 'id_role' })

  return User
}