const mongoose = require("mongoose");

const ProductGroupSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  productType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product-types",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
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
