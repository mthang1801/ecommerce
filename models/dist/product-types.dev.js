"use strict";

var mongoose = require("mongoose");

var ProductTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    "default": "active"
  },
  linkUrl: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories"
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true
  }],
  manufactors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "manufactors",
    required: true
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("product-types", ProductTypesSchema);