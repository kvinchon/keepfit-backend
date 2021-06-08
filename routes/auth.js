const { verifyRegister } = require("../middlewares");
const authController = require("../controllers/authController");

var router = require("express").Router();

module.exports = (app) => {
  /**
   * @swagger
   * /api/auth/register:
   *  post:
   *    description: Register a new User
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: body
   *        name: user
   *        description: The user to create
   *        schema:
   *          type: object
   *          required:
   *            - firstName
   *            - lastName
   *            - email
   *            - password
   *          properties:
   *            firstName:
   *              type: string
   *            lastName:
   *              type: string
   *            email:
   *              type: string
   *            password:
   *              type: string
   *            roles:
   *              type: array
   *              items:
   *                type: string
   *                enum:
   *                  - public
   *                  - admin
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.post(
    "/register",
    [
      verifyRegister.checkDuplicateEmail,
      verifyRegister.checkRolesExisted,
    ],
    authController.register
  );

  /**
   * @swagger
   * /api/auth/login:
   *  post:
   *    description: Retrieve User credentials and compare with request body
   *    consumes:
   *      - application/json
   *    parameters:
   *      - in: body
   *        name: user
   *        description: The user to log in
   *        schema:
   *          type: object
   *          required:
   *            - email
   *            - password
   *          properties:
   *            email:
   *              type: string
   *            password:
   *              type: string
   *    responses:
   *      '200':
   *        description: OK
   *      '400':
   *        description: Bad Request
   *      '500':
   *        description: Internal Server Error
   */
  router.post("/login", authController.login);

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use("/api/auth", router);
};