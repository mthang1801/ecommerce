const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
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
    status: {
      type: String,
      default: "active",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    productGroup: {
      type: Schema.Types.ObjectId,
      ref: "product-groups",
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "manufactors",
      required: true,
    },
    sold_quantity: {
      type: Number,
      default: 0,
    },
    stars: {
      type: Number,
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
    quantity: {
      type: Number,
      required: true,
    },
    fast_delivery: {
      type: Boolean,
      default: true,
    },
    ship_fee: {
      type: Number,
      default: 10000,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("products", ProductSchema);