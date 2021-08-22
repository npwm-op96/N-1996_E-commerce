module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
        id_order:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
  
        },
        id_user: {
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