const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

const isAuthenticated = async (req, res, next) => {
  const error = new Error("Unauthorized");
  error.status = 401;

  const token = req.headers.authorization;

  if (!token || !token.length) {
    return next(error);
  }

  const data = jwt.verify(token.replace("Bearer ", ""), "mysecretkey");
  if (!data) {
    return next(error);
  }

  const tokenFound = await Token.query().select().where({ token });
  if (!tokenFound[0]) {
    return next(error);
  }

  const comparisonDate = new Date();

  if (
    tokenFound[0].created_at.getTime() + tokenFound[0].ttl <
    comparisonDate.getTime()
  ) {
    return next(error);
  } else {
    req.userId = tokenFound[0].user_id;
    return next();
  }
};

module.exports = { isAuthenticated };
