const Category = require("../models/category");
const ProductTypes = require("../models/product-types");
exports.getCategoryList = async (req, res, next) => {
  try {
    const searchKey = req.query.search || "";
    if (searchKey) {
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

exports.getProductTypes = async (req, res, next) => {
  try {
    console.log(req.query);
    const searchKey = req.query.search || "";
    if (searchKey) {
      const categoryFilter = await ProductTypes.find({
        $or: [
          { name: { $regex: new RegExp(searchKey, "i") } },
          { linkUrl: { $regex: new RegExp(searchKey, "i") } },
        ],
      });
      return res.status(200).json(categoryFilter);
    }
    const page = +req.query.page || 1;
    let numberProductTypesPerPage = +req.query.number || 5;
    console.log(page);
    const numberProductTypes = await ProductTypes.countDocuments();
    let productTypesList;
    if (numberProductTypesPerPage > numberProductTypes) {
      productTypesList = await ProductTypes.find();
    } else {
      productTypesList = await ProductTypes.find()
        .skip((page - 1) * numberProductTypesPerPage)
        .limit(numberProductTypesPerPage);
    }
    res.status(200).json({ productTypesList, count: numberProductTypes });
  } catch (error) {
    next(error);
  }
};

exports.getProductTypesById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productTypes = await ProductTypes.findById(id).populate("category");
    res.status(200).json(productTypes);
  } catch (error) {
    next(error);
  }
};
