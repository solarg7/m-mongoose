var express = require("express");

var router = express.Router();

var request = require("request");
var cheerio = require("cheerio");

// Require all models


var db = require("../models");


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  res.send("<a href="+"/all"+" >Click Here to Start</a>");
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
      
      
      if (title && link && summary) {
        // Insert the data in the scrapedData db
        db.Article.create({
            title: title,
            link: link,
            summary: summary,
            storage: false
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
  res.send(true);
});

router.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.Article.find({storage: false}, function(error, found) {
      var hbsObject = {
        articles: found
      };
      res.render("index", hbsObject);
      
      // Throw any errors to the console
      if (error) {
        console.log(error);
      }
      // If there are no errors, send the data to the browser as json
      else {
        //res.json(found);
        // res.render("index", found);
      }
    });
    // console.log("paoloita");
});
router.put("/:id", function(req, res) {
  var condition = "_id: ObjectId('" + req.params.id +"'";
  console.log("Hola loco");
  console.log("condition", condition);
  var storage = "storage = " + req.params.storage;
  console.log("linea125", storage);

  db.Article.update(
    {
      _id: req.params.id
    }, 
    {
    $set: {storage: true}
    
    },
    function(error, storage) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(storage);
        res.send(storage);
      }
    }

);

});




router.delete("/:id", function(req, res) {
  console.log("Hola loco");
  db.Article.remove(
    {
      _id: req.params.id
    }, 
    function(error, removed) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(removed);
        res.send(removed);
      }
    }

);

});

router.get("/saved", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.Article.find({storage: true}, function(error, found) {
    var hbsObject = {
      articles: found
    };
    res.render("storaged", hbsObject);
    
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      //res.json(found);
      // res.render("index", found);
    }
  });
  // console.log("paoloita");
});
// Export routes for server.js to use.
module.exports = router;
