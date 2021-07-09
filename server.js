const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = express();
const PORT = process.env.PORT || 8000;

var corsOptions = {
  origin: "http://localhost:8001",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.Role;

function setRoles() {
  Role.create({
    id: 1,
    name: "public",
  });

  Role.create({
    id: 2,
    name: "admin",
  });
}

/* db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and resync database...");
  setRoles();
}); */

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "KeepFit API",
      version: "1.0.0",
      description: "API Documentation",
      servers: ["http://localhost:8000"],
    },
  },
  apis: ["./routes/auth.js", "./routes/user.js", "./routes/preference.js", "./routes/direction.js", "./routes/workout.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req, res) => {
  res.render("index");
});

// routes
require("./routes/auth")(app);
require("./routes/user")(app);
require("./routes/preference")(app);
require("./routes/direction")(app);
require("./routes/workout")(app);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});