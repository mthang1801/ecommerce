const mongoose = require("mongoose");

const ProductGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique : true,
    index : true,
    required: true,
  },
  portfolio : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "portfolios",
    required: true 
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  ],
},{timestamps : true});

module.exports = mongoose.model("product-groups", ProductGroupSchema);
