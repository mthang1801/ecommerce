const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    status: {
      type: String,
      default: "active",
    },
    slug : {
      type : String, 
      required:  true ,
      index : true 
    },
    image: {
      type : String, 
      required: true  
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true,
      },
    ],
    productGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product-groups",
        required: true,
      },
    ],
    products : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "products",
        required: true 
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("portfolios", PortfolioSchema);
