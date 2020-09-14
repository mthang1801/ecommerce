const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
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
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "active", //if disabled, block this comment
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
    ],
    responses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "responses",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", CommentSchema);
