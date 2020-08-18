const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    local: {
      name: { type: String, unique: true, sparse: true },
      email: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
      },
      password: String,
      verify_token: String,
      expiration_token: Date,
    },
    facebook: {
      id: String,
      name: { type: String, unique: true, sparse: true },
      email: { type: String },
    },
    google: {
      id: String,
      name: { type: String, unique: true, sparse: true },
      email: { type: String, unique: true, sparse: true },
    },
    avatar: {
      type: String,
      default: "avatar-default.png",
    },
    role: {
      type: String,
      default: "customer", //seller
    },
    information: {
      city: String,
      district: String,
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
  { timestamps: true, strict: false }
);

module.exports = mongoose.model("users", UserSchema);
