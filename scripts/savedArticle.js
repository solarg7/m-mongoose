var scrapeFunction = function(req, res) {
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
      
      var ifExist_in_db = db.scrapedData.count({"title":title});
      console.log(ifExist_in_db);
      
      if (title && link && summary) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert({
          title: title,
          link: link,
          summary: summary,
          storage: true
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

};

module.exports = scrapeFunction;