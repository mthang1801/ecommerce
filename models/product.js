const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
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
    linkUrl: {
      type: String,
      required: true,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "images",
        required: true,
      },
    ],
    discount: {
      value: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      start_at: {
        type: Date,
      },
      end_at: {
        type: Date,
      },
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
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productType: {
      type: Schema.Types.ObjectId,
      ref: "product-types",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    manufactor: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
        required: true,
      },
    ],
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: "votes",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
