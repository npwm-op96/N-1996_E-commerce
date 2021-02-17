module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        name: {
            type: Sequelize.STRING
        },
        id_cat: {
            type: Sequelize.INTEGER
        },
        price:{
            type:Sequelize.DOUBLE
        },
        qty: {
            type: Sequelize.INTEGER
        },
    });
    return Product;
};