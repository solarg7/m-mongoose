// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper1";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.send("Hello world");
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
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

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
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
      var checkOut = 0;
      // console.log("holita"+ title);

      
      var ifExist_in_db = db.scrapedData.findOne({"title":title});
      if ((!ifExist_in_db)&&title && link && summary) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert({
          title: title,
          link: link,
          summary: summary
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
      
      
      // .function(myDoc) { 
      //   // console.log("paolita");
      //   // console.log(myDoc);

      //   if(myDoc.link === title){
          
      //     checkOut = 1;
      //   }else if (title && link && summary) {
      //     // Insert the data in the scrapedData db
      //     db.scrapedData.insert({
      //       title: title,
      //       link: link,
      //       summary: summary
      //     },
      //     function(err, inserted) {
      //       if (err) {
      //         // Log the error if one is encountered during the query
      //         console.log(err);
      //       }
      //       else {
      //         // Otherwise, log the inserted data
      //         console.log(inserted);
      //       }
      //     });
      //     limiterCount += 1;
      //   }



      // } );

      // If this found element had both a title and a link
      // if (title && link && summary && checkOut==0) {
      //   // Insert the data in the scrapedData db
      //   db.scrapedData.insert({
      //     title: title,
      //     link: link,
      //     summary: summary
      //   },
      //   function(err, inserted) {
      //     if (err) {
      //       // Log the error if one is encountered during the query
      //       console.log(err);
      //     }
      //     else {
      //       // Otherwise, log the inserted data
      //       console.log(inserted);
      //     }
      //   });
      //   limiterCount += 1;
      // }
      return ( limiterCount !== 5 );
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
