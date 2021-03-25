module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
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
            type: Sequelize.INTEGER
        },
        img: {
            type: Sequelize.JSON
        },
     
    });
    return Product;
};