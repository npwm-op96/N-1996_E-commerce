module.exports = (sequelize, Sequelize) => {
  const Order_detail = sequelize.define("order_detail", {
    id_order: {
        type: Sequelize.INTEGER
    },
    product: {
        type: Sequelize.STRING
    },
    price:{
      type:Sequelize.DOUBLE
    },
    qty:{
      type:Sequelize.INTEGER
    },
    date_buy:{
      type:Sequelize.DATE
    }
});
  return Order_detail;
};