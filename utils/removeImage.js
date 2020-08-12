const path = require("path");
const fs = require("fs");
const removeImage = (filename) => {
  return new Promise((resolve, reject) => {
    fs.unlink(
      path.join(path.dirname(require.main.filename), "images", filename),
      (error) => {
        resolve(true);
      }
    );
  });
};

module.exports = removeImage;
