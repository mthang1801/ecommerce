const mongoose = require("mongoose");

const ProductGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  productType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product-types",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  ],
});

module.exports = mongoose.model("product-groups", ProductGroupSchema);
