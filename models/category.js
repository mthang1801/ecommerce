const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    status: {
      type: String,
      default: "active",
    },
    linkUrl: {
      type: String,
      required: true,
      index: true,
    },
    imageUrl: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "images",
      required: true,
    },
    productTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product-types",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("categories", CategorySchema);
