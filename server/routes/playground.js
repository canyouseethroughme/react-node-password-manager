const router = require("express").Router();

router.use((req, res, next) => {
  console.log("Timestamp", new Date());
  next();
  //   res.send({ response: "first path" });
  //   res.redirect("/secondpath");
});

router.get("/secondpath", (req, res, next) => {
  console.log("hit the second path for first time");
  next();
});

function customvalidateFunction(next) {
  if (valid) {
    next();
  }
}

router.get("/secondpath", (req, res) => {
  console.log("hit the second path");
  res.send({ response: "second path" });
});
////////// SESSION
router.get("/setsessionvalue", (req, res) => {
  req.session.sessionvalue = req.query.sessionvalue;
  return res.send({ response: "ok" });
});

router.get("/getsessionvalue", (req, res) => {
  return res.send({ response: req.session.sessionvalue });
});
///////////
module.exports = router;
