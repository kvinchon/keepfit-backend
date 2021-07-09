const { authJwt } = require("../middlewares");
const directionController = require("../controllers/directionController.js");

var router = require("express").Router();

module.exports = (app) => {
  /**
   * @swagger
   * /api/directions?startingPoint={startingPoint}&duration={duration}&distance={distance}&mode={mode}:
   *  get:
   *    parameters:
   *    - in: path
   *      name: startingPoint
   *      required: true
   *      description: The starting point
   *    - in: path
   *      name: type
   *      require: false
   *      description: The distance or time type
   *    - in: path
   *      name: value
   *      require: false
   *      description: The distance or time value
   *    - in: path
   *      name: mode
   *      require: false
   *      description: The mode of travel
   *    description: Retrieve directions
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    directionController.find
  );

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/directions", router);
};