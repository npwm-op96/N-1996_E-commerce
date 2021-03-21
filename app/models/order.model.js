module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        
        id_member: {
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.DECIMAL
        },
        date_buy:{
            type : Sequelize.DATE
        }
    });

    return Order;
};