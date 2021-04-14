const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
    },
    active: {
      type: Boolean,
      default: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    slug: {
      type: String,
      required: true,
      index: true,
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
      },
    ],
    manufactors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manufactors",
        required: true,
      },
    ],
    productGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product-groups",
        required: true,
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("portfolios", PortfolioSchema);
