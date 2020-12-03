var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (_req, res, _next) {
  // res.send("hello");
  res.render("./../views/index.hbs", { title: "Express" });
});

module.exports = router;
