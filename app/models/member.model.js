module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("members", {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return Member;
};