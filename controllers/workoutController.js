const db = require("../models");
const Workout = db.Workout;

exports.create = (req, res) => {
  // Save Workout to Database
  if (
    !req.body.mode ||
    !req.body.distance ||
    !req.body.coordinates ||
    !req.body.userId
  ) {
    res.status(400).send({
      message: "Invalid parameters.",
    });
    return;
  }
  Workout.findOne({
    where: {
      coordinates: req.body.coordinates,
      userId: req.body.userId,
    },
  }).then((workout) => {
    if (workout && workout.dataValues.id) {
      res.status(500).send({
        message: `Workout already exists for userId=${req.body.userId}.`,
      });
    } else {
      Workout.create({
        mode: req.body.mode,
        distance: req.body.distance,
        duration: req.body.duration,
        coordinates: req.body.coordinates,
        startingPoint: req.body.startingPoint,
        endingPoint: req.body.endingPoint,
        userId: req.body.userId,
      })
        .then((workout) => {
          res.send({ message: "Workout was successfully created." });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    }
  });
};

// Retrieve all Workouts from the database.
exports.findAll = (req, res) => {
  Workout.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving workouts.",
      });
    });
};

// Find a single Workout with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Workout.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Error retrieving workout with id=${id}. Maybe workout was not found or req.params.id is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

// Update a Workout by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Workout.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Workout was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update workout with id=${id}. Maybe workout was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating workout with id=" + id,
      });
    });
};

// Delete a Workout with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Workout.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Workout was deleted successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot delete workout with id=${id}. Maybe workout was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete workout with id=" + id,
      });
    });
};

// Delete all Workouts from the database.
exports.deleteAll = (req, res) => {
  Workout.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} workouts were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all workouts.",
      });
    });
};
