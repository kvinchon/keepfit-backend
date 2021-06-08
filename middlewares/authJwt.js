const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const User = db.User;

// Check authentication 
verifyToken = (req, res, next) => {
  var token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided.",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized.",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// Only users with admin role have access
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Access denied: admin role required.",
      });
      return;
    });
  });
};

// Only users with public or admin role have access
isPublicOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "public") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Access denied: public or admin role required.",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isPublicOrAdmin: isPublicOrAdmin,
};

module.exports = authJwt;