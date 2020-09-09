const mongoose = require("mongoose");

const OrderedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    products: [
      {
        type: Object,
        required: true,
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    method_delivery: {
      type: String,
      default: "normal",
    },
    user_message: {
      type: String,
    },
    time_complete: {
      type: Date,
    },
    time_expire: {
      type: Date,
      default: function () {
        return +new Date() + 7 * 24 * 60 * 60 * 1000;
      },
    },
    method_payment: {
      type: String,
      enum: ["cod", "card"],
      default: "cod",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ordered", OrderedSchema);
