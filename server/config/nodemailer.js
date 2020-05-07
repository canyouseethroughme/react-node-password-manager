const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "testersen420@gmail.com",
    pass: "Password420",
  },
});

module.exports = {
  transporter,
};
