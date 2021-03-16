const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    value: {
      type: Number,
      max: 5,
      min: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("votes", VoteSchema);
