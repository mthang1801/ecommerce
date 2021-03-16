"use strict";

var mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
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
  imageUrl: {
    type: String,
    required: true
  },
  productTypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product-types",
    required: true
  }]
}, {
  timestamps: true
});
module.exports = mongoose.model("categories", CategorySchema);