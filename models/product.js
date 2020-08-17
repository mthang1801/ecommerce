const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    discount_start_date: {
      type: Date,
    },
    discount_end_date: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product-types",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    manufactors: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
        required: true,
      },
    ],
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "votes",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
