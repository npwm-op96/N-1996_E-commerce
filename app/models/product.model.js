module.exports = (sequelize, Sequelize) => {
    // const Order_detai = require('../models/order_detail.model.js')(sequelize,Sequelize);
    const Product = sequelize.define("product", {
        id_product:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        price:{
            type:Sequelize.DOUBLE
        },
        qty: {
            type: Sequelize.INTEGER
        },
        type:{
            type: Sequelize.STRING
        },
        img: {
            type: Sequelize.JSON
        },
     
    });
    return Product;
};