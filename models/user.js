const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "avatar-default.png",
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
    default: "active",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  ],
  ordered: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ordered",
      required: true,
    },
  ],
});
