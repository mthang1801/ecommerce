"use strict";

var mongoose = require("mongoose");

var connectDB = function connectDB() {
  mongoose.Promise = require("bluebird");
  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

module.exports = connectDB;