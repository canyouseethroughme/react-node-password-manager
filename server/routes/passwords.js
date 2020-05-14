const router = require("express").Router();
const Password = require("../models/Password");
const { isAuthenticated } = require("../middleware/auth");

// #######################################################
// create
router.post("/create", isAuthenticated, async (req, res) => {
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
router.get("/", isAuthenticated, async (req, res) => {
  const passwords = await Password.query().select().where({
    user_id: req.userId,
  });
  res.json({ passwords });
});
// #######################################################
// update
router.put("/update/:id", async (req, res) => {
  const passId = req.params.id;
  const { username, password } = req.body;
  const updateUsername = await Password.query()
    .where({
      id: passId,
    })
    .update({
      username,
    });
  const updatePassword = await Password.query()
    .where({
      id: passId,
    })
    .update({
      password,
    });
  res.json({ updatePassword, updateUsername });
});
// #######################################################
// delete
router.delete("/delete/:id", isAuthenticated, async (req, res) => {
  const passId = req.params.id;
  const deletePassword = await Password.query()
    .where({
      id: passId,
    })
    .del();
  res.json({ deletePassword: deletePassword });
});
// #######################################################
module.exports = router;
