module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("member", {})
    const Product = sequelize.define("product", {})
    const Order = sequelize.define("order", {
        
        id_member: {
            type: Sequelize.INTEGER
        },
        id_pro: {
            type: Sequelize.INTEGER
        },
    });
    // Member.hasMany(Order, { as: "order" });
    Order.belongsTo(Product, {
        foreignKey: "id_pro",
        as: "product",
      });
    Order.belongsTo(Member, {
        foreignKey: "id_member",
        as: "member",
      });
    return Order;
};