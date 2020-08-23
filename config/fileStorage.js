const multer = require("multer");
const path = require("path");

const configFileStorage = (app) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./images");
    },
    filename: (req, file, cb) => {
      if (!["image/jpg", "image/jpeg", "image/png"].includes(file.mimetype)) {
        return cb(new Error("This file is not image file"), false);
      }

      return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  // const uploadSingleFile = multer({
  //   storage: storage,
  //   limits: { fieldSize: 1024 * 1024 },
  // }).single("image");
  const uploadMultipleFiles = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
  }).any();
  // app.use(uploadSingleFile);
  app.use(uploadMultipleFiles);
};

module.exports = configFileStorage;
