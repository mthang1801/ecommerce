const User = require("../models/user");
const Ordered = require("../models/ordered");
const Product = require("../models/product");
const ordered = require("../models/ordered");
exports.getOrderedList = async (req, res, next) => {
  try {
    console.log("fetching");
    console.time("start-fetch-ordered");
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    const orderedList = await Ordered.find({ user: user._id }).sort({
      createdAt: -1,
    });
    let outputOrderedList = [];
    for await (let ordered of orderedList) {
      for await (let [index, product] of ordered.products.entries()) {
        const productItem = await Product.findById(product._id).populate(
          "images"
        );
        ordered.products[index].image = productItem.images[0];
        ordered.products[index].name = productItem.name;
        ordered.products[index].linkUrl = productItem.linkUrl;
      }
      outputOrderedList.push(ordered);
    }
    console.timeEnd("start-fetch-ordered");
    res.status(200).json(outputOrderedList);
  } catch (error) {
    next(error);
  }
};
