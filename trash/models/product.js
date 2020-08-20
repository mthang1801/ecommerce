// const mongoose = require("mongoose");

// const ProductSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     linkUrl: {
//       type: String,
//       required: true,
//       index: true,
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "categories",
//       required: true,
//     },
//     productType: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "product-types",
//       required: true,
//     },
//     manufactors: [
//       {
//         type: String,
//         required: true,
//       },
//     ],
//     sellers: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "sellers",
//         required: true,
//       },
//     ],
//     sold: {
//       type: Number,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("products", ProductSchema);
