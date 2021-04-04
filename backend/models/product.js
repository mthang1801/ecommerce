const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    discount: {
      value: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },
      start_at: {
        type: Number,
      },
      end_at: {
        type: Number,
      },
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "active"], //pending status occurs when waiting admin confirm to post product
      default: "active",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    portfolio: {
      type: Schema.Types.ObjectId,
      ref: "portfolios",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
    productGroup: {
      type: Schema.Types.ObjectId,
      ref: "product-groups",
    },
    manufactor: {
      type: String,
      requried: true,
    },
    origin: {
      type: String,
      required: true,
    },
    sold_quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    sold_quantity_by_date : [
      {
        date : {
          type : Number, 
          default :Date.now
        },
        quantity : {
          type : Number, 
          required: true           
        }
      }
    ],
    stars: {
      type: Number,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comments",
        required: true,
      },
    ],
    votes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        star: {
          type: Number,
          required: true,
        },
      },
    ],
    quantity: {
      type: Number,
      min: 1,
      required: true,
    },
    fast_delivery: {
      type: Boolean,
      default: false,
    },
    ship_fee: {
      type: Number,
      min: 0,
      default: 12000,
    },
    weight: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
