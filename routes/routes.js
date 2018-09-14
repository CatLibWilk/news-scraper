var express = require("express");
var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");

var router = express.Router();

// router.get("/", (req, res) => {
//     res.render("index")
// });

router.get("/scrape", (req, res) => {
    console.log("scraping");
    // First, we grab the body of the html with request
    db.Article.remove({}).then((err, data) => {
      console.log("cleared");
    })
    request.get("https://lightboxfilmcenter.org/programs/", function(error, response, html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("article.c-article").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.headline = $(this)
          .find("h2.o-title--secondary")
          .text();
        result.summary = $(this)
          .find("p.o-heading")
          .text();
          result.url = $(this)
          .find("a.c-link--navigate-primary")
          .attr("href");
  
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });
  
      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });

router.get("/", (req, res) => {
  db.Article.find({}).then(result => {
    console.log(result)
    res.render("index", {article: result});
  });
});



module.exports = router;