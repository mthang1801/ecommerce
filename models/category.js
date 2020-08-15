const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    linkUrl: {
      type: String,
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
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
