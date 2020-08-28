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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
});

module.exports = mongoose.model("images", ImageSchema);
