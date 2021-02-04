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
db.Products = require("./product.model.js")(sequelize, Sequelize);
db.Members = require("./member.model.js")(sequelize, Sequelize);
db.Orders = require("./order.model.js")(sequelize, Sequelize);


module.exports = db;