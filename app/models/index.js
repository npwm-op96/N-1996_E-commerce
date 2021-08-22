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
db.Profile = require("../models/profile.model.js")(sequelize,Sequelize);
db.Order_details = require("../models/order_detail.model")(sequelize,Sequelize);

//set order and detail 
// db.Order_details.hasMany(db.Orders, {foreignKey: 'id_order', targetKey: 'id_order'}); 
db.Orders.hasMany(db.Order_details, {foreignKey: 'id_order', targetKey: 'id_order'}); 
//end

// db.Products.hasMany(db.Order_details, {foreignKey: 'id_product', targetKey: 'id_product'}); 
db.Order_details.belongsTo(db.Products, {foreignKey: 'id_product', targetKey: 'id_product'}); 


module.exports = db;