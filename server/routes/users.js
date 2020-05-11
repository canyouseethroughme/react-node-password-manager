const router = require("express").Router();
// bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;
// JWT
const jwt = require("jsonwebtoken");
// Models
const User = require("../models/User");
const Token = require("../models/Token");
const Password = require("../models/Password");
// Authentification
const { isAuthenticated } = require("../middleware/auth");
// Nodemailer
const { transporter } = require("../config/nodemailer");

// users/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (username && password) {
      const users = await User.query()
        .select()
        .where({ username: username })
        .limit(1);
      const user = users[0];
      if (!user) {
        return res.status(404).send({ response: "wrong credentials" });
      }
      bcrypt.compare(password, user.password, async (error, isSame) => {
        if (error) {
          return res.status(500).send({
            response: "something went wrong with the password",
            error,
          });
        }
        if (!isSame) {
          return res.status(404).send({ response: "wrong credentials" });
        } else {
          const token = jwt.sign(
            { userId: user.id, username: user.username },
            "mysecretkey"
          );
          const previousToken = await Token.query()
            .select()
            .where({ user_id: user.id })
            .limit(1);

          if (!previousToken[0]) {
            await Token.query().insert({
              token,
              ttl: 360000,
              user_id: user.id,
            });
          } else {
            await Token.query().where({ user_id: user.id }).del();
            await Token.query().insert({
              token,
              ttl: 360000,
              user_id: user.id,
            });
          }
          return res.status(200).send({ username: user.username, token });
        }
      });
    } else {
      return res
        .status(404)
        .send({ response: "missing username and password" });
    }
  } catch (err) {
    console.log(err);
  }
});
// #############################################################
// users/register
router.post("/register", (req, res) => {
  const {
    username,
    password,
    repeatedPassword,
    firstName,
    lastName,
    email,
  } = req.body;
  if (
    username &&
    password &&
    repeatedPassword &&
    password === repeatedPassword &&
    email
  ) {
    if (password.length < 7) {
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
              first_name: firstName,
              last_name: lastName,
              email,
            });
            // NODEMAILER
            const mailOptions = {
              from: "SavePassMe",
              to: email,
              subject: "Password manager powered by Windows98",
              text: `Welcome, ${username} to the best thing since Windows 98 until now!`,
            };
            transporter.sendMail(mailOptions, (err, data) => {
              if (err) {
                res
                  .status(403)
                  .json({ response: "Problems creating the account, ", err });
                console.log("Email error", err);
                return;
              } else {
                return res.status(200).send({ response: newUser.username });
              }
            });
            // #################
          }
        } catch (error) {
          return res.status(500).send({
            response: "something went wrong with the database",
            error,
          });
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
// #############################################################
// user/delete
router.delete("/delete", isAuthenticated, async (req, res, next) => {
  await Token.query().where({ user_id: req.userId }).del();
  await Password.query().where({ user_id: req.userId }).del();
  const deleteUser = await User.query().where({ id: req.userId }).del();
  res.json({ deletedUser: deleteUser });
});
// #############################################################
// user/forgot-password
router.post("/forgot-password", async (req, res, next) => {
  const { email } = req.body;
  const token = await jwt.sign({ email }, "mysecretkey");
  await User.query()
    .select()
    .where({ email })
    .update({ reset_password: token });
  // NODEMAILER
  const mailOptions = {
    from: "SavePassMe",
    to: email,
    subject: "Reset password for Password manager powered by Windows98",
    text: `Visit this link to reset your password.
      http://localhost:3000/update-password?token=${token}
      `,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res
        .status(403)
        .json({ response: "Problems creating the account, ", err });
      console.log("Email error", err);
      return;
    } else {
      // return res.status(200).send({ response: newUser.username });
      res.json({ response: `reset password for ${email}` });
    }
  });
  // #################
});
// #############################################################
// user/update-password
router.put("/update-password", async (req, res, next) => {
  const { newPassword } = req.body;
  const { token } = req.query;
  if (token) {
    bcrypt.hash(newPassword, saltRounds, async (error, hashedPassword) => {
      if (error) {
        res.json({ response: "error updating the password" });
      }
      const updatedUser = await User.query()
        .where({ reset_password: token })
        .update({ password: hashedPassword });
      res.json({ updatedUser });
    });
  }
});
// #############################################################
// isAuthentificated
router.get("/authentication", isAuthenticated, (req, res, next) => {
  res.json({ response: "user is authenticated" });
});
module.exports = router;
