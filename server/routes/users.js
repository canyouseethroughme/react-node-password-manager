const router = require("express").Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

// users/login
const User = require("../models/User");

router.post("/users/login", async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    // mysql select * from users where users.username = "admin"
    const users = await User.query()
      .select()
      .where({ username: username })
      .limit(1);
    const user = users[0];
    if (!user) {
      return res.status(404).send({ response: "wrong username" });
    }
    bcrypt.compare(password, user.password, (error, isSame) => {
      if (error) {
        return res.status(500).send();
      }
      if (!isSame) {
        return res.status(404).send({});
      } else {
        return res.status(200).send({ username: user.username });
      }
    });
  } else {
    return res.status(404).send({ response: "missing username and password" });
  }
});

// users/register
router.post("/users/register", (req, res) => {
  const { username, password, repeatedPassword } = req.body;
  if (
    username &&
    password &&
    repeatedPassword &&
    password === repeatedPassword
  ) {
    if (password.length < 8) {
      return res
        .status(404)
        .send({ response: "password does not fulfill the requirements" });
    } else {
      bcrypt.hash(password, saltRounds, async (error, hashedPassword) => {
        if (error) {
          return res.status(500).send({});
        }
        try {
          const existingUser = await User.query()
            .select()
            .where({ username: username })
            .limit(1);

          if (existingUser[0]) {
            return res.status(404).send({ response: "user already exists" });
          } else {
            const newUser = await User.query().insert({
              username: username,
              password: hashedPassword,
            });
            return res.status(200).send({ response: newUser.username });
          }
        } catch (error) {
          return res
            .status(500)
            .send({ response: "something went wrong with the database" });
        }
      });
    }
  } else if (password !== repeatPassword) {
    return res
      .status(404)
      .send({ response: "Password and repeat password are not the same" });
  } else {
    return res.status(404).send({ response: "missing some fields" });
  }
});

module.exports = router;
