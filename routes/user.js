const { authJwt } = require("../middlewares");
const userController = require("../controllers/userController.js");

var router = require("express").Router();

module.exports = (app) => {
  /**
   * @swagger
   * /api/users:
   *  get:
   *    description: Retrieve all Users
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
    [authJwt.verifyToken, authJwt.isPublicOrAdmin],
    userController.findAll
  );

  /**
   * @swagger
   * /api/users/{id}:
   *  get:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The user ID
   *    description: Retrieve a single User with id
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
    [authJwt.verifyToken, authJwt.isPublicOrAdmin],
    userController.findOne
  );

  /**
   * @swagger
   * /api/users/{id}/workouts:
   *  get:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The user ID
   *    description: Retrieve user's Workouts with id
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
    "/:id/workouts",
    [authJwt.verifyToken, authJwt.isPublicOrAdmin],
    userController.findWorkouts
  );

  /**
   * @swagger
   * /api/users/{id}/stats:
   *  get:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The user ID
   *    description: Retrieve user's Stats with id
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
    "/:id/stats",
    [authJwt.verifyToken, authJwt.isPublicOrAdmin],
    userController.findStats
  );

  /**
   * @swagger
   * /api/users/{id}:
   *  put:
   *    description: Update a User with id
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The user ID
   *    - in: body
   *      name: user
   *      description: The user information to update
   *      schema:
   *        type: object
   *        properties:
   *          firstName:
   *            type: string
   *          lastName:
   *            type: string
   *          email:
   *            type: string
   *          password:
   *            type: string
   *          roles:
   *            type: array
   *            items:
   *              type: string
   *              enum:
   *                - public
   *                - admin
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
    [authJwt.verifyToken, authJwt.isPublicOrAdmin],
    userController.update
  );

  /**
   * @swagger
   * /api/users/{id}:
   *  delete:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The user ID
   *    description: Delete a User with id
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
    userController.delete
  );

  /**
   * @swagger
   * /api/users:
   *  delete:
   *    description: Delete all Users
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
    userController.deleteAll
  );

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/users", router);
};