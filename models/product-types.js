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
    productGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product-groups",
        required: true,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
    manufactors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manufactors",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("product-types", ProductTypesSchema);
