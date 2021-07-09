const { authJwt } = require("../middlewares");
const preferenceController = require("../controllers/preferenceController.js");

var router = require("express").Router();

module.exports = (app) => {
  /**
   * @swagger
   * /api/preferences:
   *  get:
   *    description: Retrieve all Preferences
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '500':
   *        description: Internal Server Error
   */
  router.get(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    preferenceController.findAll
  );

  /**
   * @swagger
   * /api/preferences/{id}:
   *  get:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The preference ID
   *    description: Retrieve a single Preference with id
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
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    preferenceController.findOne
  );

  /**
   * @swagger
   * /api/preferences/{id}:
   *  put:
   *    description: Update a Preference with id
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The preference ID
   *    - in: body
   *      name: preference
   *      description: The preference information to update
   *      schema:
   *        type: object
   *        properties:
   *          type:
   *            type: string
   *          value:
   *            type: number
   *          mode:
   *            type: string
   *          userId:
   *            type: number
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
  router.put(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    preferenceController.update
  );

  /**
   * @swagger
   * /api/preferences/{id}:
   *  delete:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The preference ID
   *    description: Delete a Preference with id
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
  router.delete(
    "/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    preferenceController.delete
  );

  /**
   * @swagger
   * /api/preferences:
   *  delete:
   *    description: Delete all Preferences
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      '200':
   *        description: OK
   *      '500':
   *        description: Internal Server Error
   */
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.isAdmin],
    preferenceController.deleteAll
  );

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/preferences", router);
};