var express = require("express");
var exphbrs = require("express-handlebars")
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var request = require("request")
var cheerio = require("cheerio");

var connection = require("./config/connection.js")

// Require all models
var db = require("./models");

var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });