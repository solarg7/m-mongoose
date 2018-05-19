var express = require("express");

var router = express.Router();

// router.get("/", function(req, res) {
//     res.render("home");
// });

// router.get("/", function(req, res) {
//     res.send("Hello world holita");
// });

router.get("/", function(req, res) {
    res.render("index");
});

module.exports = router;