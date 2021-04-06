const mongoose = require("mongoose");

const ManufactorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },   
    slug : {
      type : String , 
      index : true, 
      unique : true, 
      required : true
    },
    portfolios : [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "portfolios",
      required : true 
    }],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    ],
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("manufactors", ManufactorSchema);
