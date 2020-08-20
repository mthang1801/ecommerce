const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
});

module.exports = mongoose.model("images", ImageSchema);
