
module.exports = (sequelize, Sequelize) => {

  const Orders = require('../models/order.model.js')(sequelize,Sequelize);
  const Product = require('../models/product.model.js')(sequelize,Sequelize);

  const Order_detail = sequelize.define("order_detail", {
    id_product: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
      type:Sequelize.DOUBLE
    },
    qty:{
      type:Sequelize.INTEGER
    },
    id_order:{
      type:Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
  },
    date_buy:{
      type:Sequelize.DATE
    }
    
});
Product.hasMany(Order_detail, { foreignKey: 'id_product' })



  return Order_detail;
};