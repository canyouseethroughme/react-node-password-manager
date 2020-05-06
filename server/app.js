const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// SETUL THE DATABASE
const { Model } = require("objection");
const Knex = require("knex");
const knexFile = require("./knexfile");

const knex = Knex(knexFile.development);
// Give the knex instance to objection.
Model.knex(knex);

const session = require("express-session");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 4, // limit each IP to 4 requests per windowMs
});

app.use("/users/login", authLimiter);
app.use("/users/register", authLimiter);

/* Set up routes with our server instance */
const usersRoute = require("./routes/users.js");

// only use the custom middleware for the secondpath route
app.use("/users", usersRoute);

// Start the server
const port = process.env.PORT || 9090;

const server = app.listen(port, (error) => {
  if (error) {
    console.log("error running in express");
  }
  console.log("server is running on port", server.address().port);
});
