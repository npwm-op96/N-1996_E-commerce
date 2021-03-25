module.exports = (sequelize, Sequelize) => {
    const Type_product = sequelize.define("type_product", {
        
        name: {
            type: Sequelize.STRING
        },

    });
    return Type_product;
};