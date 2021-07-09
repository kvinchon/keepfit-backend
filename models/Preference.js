module.exports = (sequelize, Sequelize) => {
  const Preference = sequelize.define("preferences", {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    mode: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return Preference;
};