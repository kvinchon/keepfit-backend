const db = require("../models");
const User = db.User;
const Workout = db.Workout;
const sequelize = db.sequelize;

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Error retrieving user with id=${id}. Maybe user was not found or req.params.id is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

// Find user's Workouts with an id
exports.findWorkouts = (req, res) => {
  const id = req.params.id;

  Workout.findAll({
    where: { userId: id },
    order: [["createdAt", "DESC"]],
    limit: 5,
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Error retrieving workouts with userId=${id}. Maybe workout was not found or req.params.id is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving workout with userId=" + id,
      });
    });
};

// Find user's Workouts with an id
exports.findStats = (req, res) => {
  const id = req.params.id;

  Workout.findAll({
    where: { userId: id },
    attributes: [
      [sequelize.fn("sum", sequelize.col("distance")), "totalDistance"],
      [sequelize.fn("sum", sequelize.col("duration")), "totalDuration"],
      [sequelize.fn("avg", sequelize.col("distance")), "avgDistance"],
      [sequelize.fn("avg", sequelize.col("duration")), "avgDuration"],
      [sequelize.fn("max", sequelize.col("duration")), "maxDuration"],
      [sequelize.fn("max", sequelize.col("distance")), "maxDistance"],
    ],
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Error retrieving stats with userId=${id}. Maybe stats was not found or req.params.id is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving stats with userId=" + id,
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot delete user with id=${id}. Maybe user was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete user with id=" + id,
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} users were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};