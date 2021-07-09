module.exports = (sequelize, Sequelize) => {
  const Workout = sequelize.define("workouts", {
    mode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    distance: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    duration: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    coordinates: {
      type: Sequelize.STRING(512),
      allowNull: false,
    },
    startingPoint: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    endingPoint: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Workout;
};