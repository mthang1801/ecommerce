const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    local: {
      name: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
      avatar: {
        type: String,
        default: "avatar-default.png",
      },
      verify_token: String,
      expiration_token: Date,
    },
    facebook: {
      name: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      avatar: {
        type: String,
      },
    },
    google: {
      name: {
        type: String,
      },
      email: {
        type: String,
        unique: true,
      },
      avatar: {
        type: String,
      },
    },
    information: {
      country: String,
      city: String,
      address: String,
      phone: String,
      zipCode: Number,
    },
    status: {
      type: String,
      default: "active", //disabled
    },
    //products user sold
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    //products user odered includes paid or unpaid
    ordered: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ordered",
        required: true,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products.comments",
        required: true,
      },
    ],
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products.votes",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
