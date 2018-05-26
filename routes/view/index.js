var express = require("express");

var router = express.Router();



// router.get("/", function(req, res) {
//     res.render("home");
// });

// router.get("/", function(req, res) {
//     res.send("Hello world holita");
// });

router.get("/all", function(req, res) {
    res.render("index");
});

router.get("/saved", function(req, res) {
    res.render("storaged");
});
module.exports = router;