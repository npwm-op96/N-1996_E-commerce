module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        
        id_member: {
            type: Sequelize.INTEGER
        },
        // id_pro: {
        //     type: Sequelize.INTEGER
        // },
    });

    return Order;
};