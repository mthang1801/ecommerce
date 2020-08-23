"use strict";

var express = require("express");

var configFileStorage = require("./config/fileStorage");

var path = require("path");

var initRouter = require("./routes");

var connectDB = require("./config/connectDB");

var configViewEngine = require("./config/viewEngine");

var CORS = require("./config/cors");

var handlerError = require("./config/handleError");

var app = express();
var port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "production") require("dotenv").config(); //config view Engine

configViewEngine(app);
app.use(express.json());
app.use(express.urlencoded({
  extended: false
})); //Handler Access-Control-Allow-Origin

CORS(app); //set up static file images

app.use("/images", express["static"](path.join(__dirname, "images"))); //set up file storage

configFileStorage(app); //init Router

initRouter(app); //handle error

handlerError(app);
connectDB().then(function (res) {
  console.log("DB has been connected");
  app.listen(port, console.log("server is running on port ".concat(port)));
})["catch"](function (err) {
  return console.log(err);
});