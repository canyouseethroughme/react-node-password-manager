const router = require("express").Router();
const Password = require("../models/Password");
const { isAuthenticated } = require("../middleware/auth");

// #######################################################
// create
router.post("/create", isAuthenticated, async (req, res, next) => {
  const { account, username, password } = req.body;
  const newPassword = await Password.query().insert({
    account,
    username,
    password,
    user_id: req.userId,
  });
  res.json({ newPassword });
});
// #######################################################
// read // get passwords for a specific user
router.get("/", isAuthenticated, async (req, res, next) => {
  const passwords = await Password.query().select().where({
    user_id: req.userId,
  });
  res.json({ passwords });
});
// #######################################################

module.exports = router;
