const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatoresAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Members = require("./member.model.js")(sequelize, Sequelize);
db.Products = require("./product.model.js")(sequelize, Sequelize);
db.Orders = require("./order.model.js")(sequelize, Sequelize);
db.Roles = require("../models/role.model.js")(sequelize,Sequelize);

db.Roles.belongsToMany(db.Members,{
    through:"member_roles",
    foreignKey:"roleId",
    otherKey:"memberId"
});
db.Members.belongsToMany(db.Roles,{
    through:"member_roles",
    foreignKey:"memberId",
    otherKey:"roleId"
});

db.ROLES = ["user","admin","moderator"];

module.exports = db;