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
    slug: {
      type: String,
      required: true,
      unique : true,
      index: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    portfolio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "portfolios",
      required: true 
    },
    productGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product-groups",
        required: true,
      },
    ],
    products : [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    image : {
      data : Buffer,
      mimetype : String, 
      filename : String
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

module.exports = mongoose.model("categories", ProductTypesSchema);
