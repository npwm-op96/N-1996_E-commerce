module.exports = (sequelize, Sequelize) => {
  const Member = sequelize.define("member", {
        
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    photo:{
      type:Sequelize.BLOB
    }
});

  return Member;
};