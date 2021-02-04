const { Orders } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {})
    const Member = sequelize.define("member", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        bd: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false

        },
        email: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        no: {
            type: Sequelize.STRING
        },
    });
    Member.belongsTo(Order, {
        foreignKey: "id_member",
        as: "member",
      });

    return Member;
};