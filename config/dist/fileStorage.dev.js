"use strict";

var multer = require("multer");

var path = require("path");

var configFileStorage = function configFileStorage(app) {
  var storage = multer.diskStorage({
    destination: function destination(req, file, cb) {
      cb(null, "./images");
    },
    filename: function filename(req, file, cb) {
      if (!["image/jpg", "image/jpeg", "image/png"].includes(file.mimetype)) {
        return cb(new Error("This file is not image file"), false);
      }

      return cb(null, "".concat(Date.now(), "-").concat(file.originalname));
    }
  }); // const uploadSingleFile = multer({
  //   storage: storage,
  //   limits: { fieldSize: 1024 * 1024 },
  // }).single("image");

  var uploadMultipleFiles = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024
    }
  }).any(); // app.use(uploadSingleFile);

  app.use(uploadMultipleFiles);
};

module.exports = configFileStorage;