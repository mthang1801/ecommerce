const mongoose = require("mongoose");

const ManufactorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    linkUrl: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
    productGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("manufactors", ManufactorSchema);
