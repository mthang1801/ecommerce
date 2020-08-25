const mongoose = require("mongoose");

const ProductTypesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    linkUrl: {
      type: String,
      required: true,
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    manufactors: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product-types", ProductTypesSchema);
