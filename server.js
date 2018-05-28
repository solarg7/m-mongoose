var express = require("express");
var mongojs = require("mongojs");

var bodyParser = require("body-parser");
var logger = require("morgan");

var mongoose = require("mongoose");
// Connect to the Mongo DB
// mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/homework14", function (err){
//     if (err) throw err;
//     console.log("Successfully connected");
// });

var databaseUri = "mongodb://localhost/homework14";

if (process.env.MONGODB_URI){
  mongoose.connect(process.env.MONGODB_URI);
} else{
  mongoose.connect(databaseUri);
}

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/homework14");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var request = require("request");
var cheerio = require("cheerio");

// Require all models
//var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


// app.get("/", function(req, res) {
//     res.send("Hello world");
// });

// Import routes and give the server access to them.
var routes = require("./controllers/newController.js");

app.use(routes);

// var scrapes = require("./scripts/scrape.js");

// app.use(scrapes);


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
