var express = require("express");

var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");

// Require all models


var db = require("../models");

// Import the model (cat.js) to use its database functions.
// var cat = require("../models/cat.js");


// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.send("Hello world holita");
});



//var scrapeFunction = require("../scripts/scrape.js");

router.get("/scrape", function(req, res) {
  // Make a request for the news section of `ycombinator`
  request("https://www.nytimes.com/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    var limiterCount = 0;
    $("article.story").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).children().children("a").text();
      var link = $(element).children().children("a").attr("href");
      var summary = $(element).children("p.summary").text();
      //var storage = false;

      
      var checkOut = 0;
      
      // console.log("holita"+ title);
      //console.log(title);
      
      // var ifExist_in_db = db.Article.count({"title":title});
      // console.log(ifExist_in_db);
      
      if (title && link && summary) {
        // Insert the data in the scrapedData db
        db.Article.create({
            title: title,
            link: link,
            summary: summary,
            //storage: true
          },
          function(err, inserted) {
            if (err) {
              // Log the error if one is encountered during the query
              console.log(err);
            }
            else {
              // Otherwise, log the inserted data
              console.log(inserted);
            }
        });
        limiterCount += 1;
      }
      
      return ( limiterCount !== 5 );
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});



router.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.Article.find({}, function(error, found) {
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        res.json(found);
      }
    });
});

router.post("/api/cats", function(req, res) {
  cat.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
