var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Setting express functions to an app variable
var app = express();

// Giving a port to the server and allowing for deployment to Heroku
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './app/public')));
var api = require('./app/routing/apiRoutes.js'); 
api(app);
var html = require('./app/routing/htmlRoutes.js');
html(app);

// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});