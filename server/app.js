const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SETUL THE DATABASE
const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile");

const knex = Knex(knexFile.development);
// Give the knex instance to objection.
Model.knex(knex);

const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 4 requests per windowMs
});

app.use("/users/login", authLimiter);
app.use("/users/register", authLimiter);

/* Set up routes with our server instance */
const usersRoute = require("./routes/users.js");
const passwordsRoute = require("./routes/passwords.js");

// only use the custom middleware for the secondpath route
app.use("/users", usersRoute);
app.use("/passwords", passwordsRoute);

// Start the server
const port = 9090;

const server = app.listen(port, (error) => {
  if (error) {
    console.log("error running in express");
  }
  console.log("server is running on port", server.address().port);
});
