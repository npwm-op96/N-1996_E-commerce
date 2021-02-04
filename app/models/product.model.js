const { Products } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {})

    const Product = sequelize.define("product", {
        name: {
            type: Sequelize.STRING
        },
        id_cat: {
            type: Sequelize.INTEGER
        },
        qty: {
            type: Sequelize.INTEGER
        },
    });
    // Products.belongsTo(Order, {
    //     foreignKey: "id_member",
    //     as: "member",
    //   });
    return Product;
};