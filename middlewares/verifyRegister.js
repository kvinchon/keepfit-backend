const db = require("../models");
const ROLES = db.ROLES;
const User = db.User;

// Check if email is already in use
checkDuplicateEmail = (req, res, next) => {
  // Email
  if (!req.body.email) {
    res.status(400).send({
      message: "Email can not be empty.",
    });
    return;
  }

  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Email is already in use.",
      });
      return;
    }

    next();
  });
};

// Check if request roles match database roles
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifyRegister = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifyRegister;