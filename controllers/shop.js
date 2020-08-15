const Category = require("../models/category");
const ProductTypes = require("../models/product-types");
const Product = require("../models/product");
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

exports.getListLinksProductTypes = async (req, res, next) => {
  try {
    const { id } = req.query;
    const category = await Category.findById(id);
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      throw err;
    }
    const productTypes = category.productTypes;
    let productTypesPromise = productTypes.map(async (_id) => {
      const productType = await ProductTypes.findById(_id);
      return {
        _id: productType._id,
        linkUrl: productType.linkUrl,
        name: productType.name,
      };
    });
    const listLinkUrl = await Promise.all(productTypesPromise);
    res.status(200).json(listLinkUrl);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const searchKey = req.query.search || "";
    if (searchKey) {
      const categoryFilter = await Product.find({
        $or: [
          { name: { $regex: new RegExp(searchKey, "i") } },
          { linkUrl: { $regex: new RegExp(searchKey, "i") } },
        ],
      });
      return res.status(200).json(categoryFilter);
    }
    const page = +req.query.page || 1;
    let numberProductsPerPage = +req.query.number || 5;
    const numberProducts = await Product.countDocuments();
    let productsList;
    if (numberProductsPerPage > numberProducts) {
      productsList = await Product.find();
    } else {
      productsList = await Product.find()
        .skip((page - 1) * numberProductsPerPage)
        .limit(numberProductsPerPage);
    }
    res.status(200).json({ productsList, count: numberProducts });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id)
      .populate("category")
      .populate("productTypes");

    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }
    const productPopulate = await product
      .populate("productType")
      .execPopulate();
    const linkUrl = productPopulate.linkUrl;
    const categoryLink = productPopulate.category.linkUrl;
    const rootLink = productPopulate.productType.linkUrl;
    const name = productPopulate.name;
    const _id = productPopulate._id;
    const productTypes = productPopulate.category.productTypes;
    const curCategory = {
      _id: productPopulate.category._id,
      linkUrl: productPopulate.category.linkUrl,
    };
    const curProductType = {
      _id: productPopulate.productType._id,
      name: productPopulate.productType.name,
      linkUrl: productPopulate.productType.linkUrl,
    };

    res.status(200).json({
      linkUrl,
      categoryLink,
      rootLink,
      name,
      _id,
      productTypes,
      curCategory,
      curProductType,
    });
  } catch (error) {
    next(error);
  }
};
