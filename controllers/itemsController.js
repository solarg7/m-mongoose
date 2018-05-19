// Require all models

var db = require("../models");

module.exports = {
    findAll: function(req, res) {
    // Find all results from the scrapedData collection in the db
        db.Article.find({}, function(error, found) {
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
    },
};

            
            
//             {}, function(error, found) {
//             var hbsObject = {
//                 articles: found
//             };
//             res.render("index", hbsObject);
            
//             // Throw any errors to the console
//             if (error) {
//                 console.log(error);
//             }
//             // If there are no errors, send the data to the browser as json
//             else {
//                 //res.json(found);
//                 // res.render("index", found);
//             }
//         });
//     }
//     // console.log("paoloita");
// };


// // Export routes for server.js to use.
// module.exports = router;

