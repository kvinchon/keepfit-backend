const axios = require("axios");
const db = require("../models");
const User = db.User;

const TYPES = ["duration", "distance"];
const MODES = ["walking", "cycling"];

// Retrieve directions from starting point and distance / time
exports.find = (req, res) => {
  let { startingPoint, type, value, mode } = req.query;
  try {
    let coordinates = startingPoint.split(",");
    // no starting point
    if (coordinates.length != 2) {
      res.status(400).send({
        message: `Error retrieving directions with startingPoint=${startingPoint}. You must provide the starting point with longitude and latitude.`,
      });
    }
    // no type
    if (!TYPES.includes(type)) {
      res.status(400).send({
        message: `Error retrieving directions with type=${type}. You must choose a type between duration and distance.`,
      });
    }
    // no value
    if (isNaN(value)) {
      res.status(400).send({
        message: `Error retrieving directions with value=${value}. You must provide an integer.`,
      });
    }
    // no mode
    if (!MODES.includes(mode)) {
      res.status(400).send({
        message: `Error retrieving directions with mode=${mode}. You must choose a mode between walking and cycling.`,
      });
    }
    if (type === "duration" && !between(value, 1, 60)) {
      res.status(400).send({
        message: `Error retrieving directions with value=${value}. You must provide an integer between 1 and 60.`,
      });
    }
    if (type === "distance" && !between(value, 1, 100000)) {
      res.status(400).send({
        message: `Error retrieving directions with value=${value}. You must provide an integer between 1 and 100000.`,
      });
    }

    let url = `https://api.mapbox.com/isochrone/v1/mapbox/${mode}/${startingPoint}?${
      type === "duration" ? "contours_minutes" : "contours_meters"
    }=${value}&polygons=true&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

    axios
      .get(url)
      .then(function (response) {
        // handle success
        let coordinates = response.data.features[0].geometry.coordinates[0];
        coordinates =
          coordinates[Math.floor(Math.random() * coordinates.length)];

        let coordsArr = [];
        coordsArr.push(startingPoint);
        coordsArr.push(coordinates.join(","));

        url = `https://api.mapbox.com/directions/v5/mapbox/${mode}/${coordsArr.join(
          ";"
        )}?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;
        axios
          .get(url)
          .then(function (response) {
            res.status(200).send(response.data);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  } catch (e) {
    res.status(500).send({
      message: `Error retrieving directions with startingPoint=${startingPoint}, type=${type}, value=${value} and mode=${mode}`,
    });
  }

  function between(x, min, max) {
    return x >= min && x <= max;
  }
};
