const { authJwt } = require("../middlewares");
const workoutController = require("../controllers/workoutController.js");

var router = require("express").Router();

module.exports = (app) => {
  /**
   * @swagger
   * /api/workouts:
   *  post:
   *    description: Create a Workout
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: body
   *        name: workout
   *        description: The workout to create
   *        schema:
   *          type: object
   *          required:
   *            - mode
   *            - distance
   *            - duration
   *            - coordinates
   *            - startingPoint
   *            - endingPoint
   *            - userId
   *          properties:
   *            mode:
   *              type: string
   *            distance:
   *              type: number
   *            duration:
   *              type: number
   *            coordinates:
   *              type: string
   *            startingPoint:
   *              type: string
   *            endingPoint:
   *              type: string
   *            userId:
   *              type: number
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
   router.post("/", workoutController.create);

  /**
   * @swagger
   * /api/workouts:
   *  get:
   *    description: Retrieve all Workouts
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
    workoutController.findAll
  );

  /**
   * @swagger
   * /api/workouts/{id}:
   *  get:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The workout ID
   *    description: Retrieve a single Workout with id
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
    workoutController.findOne
  );

  /**
   * @swagger
   * /api/workouts/{id}:
   *  put:
   *    description: Update a Workout with id
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The workout ID
   *    - in: body
   *      name: user
   *      description: The workout information to update
   *      schema:
   *        type: object
   *        properties:
   *          mode:
   *            type: string
   *          distance:
   *            type: number
   *          duration:
   *            type: number
   *          coordinates:
   *            type: string
   *          startingPoint:
   *            type: string
   *          endingPoint:
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
    workoutController.update
  );

  /**
   * @swagger
   * /api/workouts/{id}:
   *  delete:
   *    parameters:
   *    - in: path
   *      name: id
   *      required: true
   *      description: The workout ID
   *    description: Delete a Workout with id
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
    workoutController.delete
  );

  /**
   * @swagger
   * /api/workouts:
   *  delete:
   *    description: Delete all Workouts
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
    workoutController.deleteAll
  );

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/workouts", router);
};