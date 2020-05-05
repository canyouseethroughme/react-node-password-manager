const credentials = require("./config/dbcredentials");
const knexSnakeCaseMapper = require("objection").knexSnakeCaseMappers;

const { database, user, password } = credentials;
module.exports = {
  development: {
    client: "mysql2",
    connection: {
      database: database,
      user: user,
      password: password,
      insecureAuth: true
    }
  },
  ...knexSnakeCaseMapper()
};
