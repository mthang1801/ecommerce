const Category = require("../models/category");
exports.getCategoryList = async (req, res, next) => {
  try {
    const searchKey = req.query.search || "";
    if (searchKey !== undefined) {
      const categoryFilter = await Category.find({
        $or: [
          { name: { $regex: new RegExp(searchKey, "i") } },
          { linkUrl: { $regex: new RegExp(searchKey, "i") } },
        ],
      });
      return res.status(200).json(categoryFilter);
    }
    const categoryList = await Category.find();
    res.status(200).json(categoryList);
  } catch (error) {
    next(error);
  }
};