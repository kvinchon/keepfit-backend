const db = require("../models");
const Preference = db.Preference;

// Retrieve all Preferences from the database.
exports.findAll = (req, res) => {
  Preference.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving preferences.",
      });
    });
};

// Find a single Preference with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Preference.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(400).send({
          message: `Error retrieving preference with id=${id}. Maybe preference was not found or req.params.id is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving preference with id=" + id,
      });
    });
};

// Update a Preference by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Preference.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Preference was updated successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot update preference with id=${id}. Maybe preference was not found or req.body is empty.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating preference with id=" + id,
      });
    });
};

// Delete a Preference with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Preference.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Preference was deleted successfully.",
        });
      } else {
        res.status(400).send({
          message: `Cannot delete preference with id=${id}. Maybe preference was not found.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete preference with id=" + id,
      });
    });
};

// Delete all Preferences from the database.
exports.deleteAll = (req, res) => {
  Preference.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} preferences were deleted successfully.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all preferences.",
      });
    });
};