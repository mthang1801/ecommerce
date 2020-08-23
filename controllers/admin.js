const Category = require("../models/category");
const ProductTypes = require("../models/product-types");
const Product = require("../models/product");
const User = require("../models/user");
const removeImage = require("../utils/removeImage");
exports.postCategory = async (req, res, next) => {
  try {
    let { name, linkUrl } = req.body;
    if (linkUrl[0] !== "/") {
      linkUrl = "/" + linkUrl;
    }
    const checkCategoryExisting = await Category.findOne({
      name: name,
      linkUrl: linkUrl,
    });
    if (checkCategoryExisting) {
      const error = new Error("Category Name or linkURL has been existing");
      error.statusCode = 400;
      throw error;
    }
    const newCategory = new Category({
      name,
      linkUrl,
      imageUrl: req.file.filename,
    });
    await newCategory.save();
    res.status(201).json({ ...newCategory._doc });
  } catch (error) {
    next(error);
  }
};

exports.putCategory = async (req, res, next) => {
  try {
    const { _id, name, linkUrl } = req.body;
    const category = await Category.findById(_id);
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      throw error;
    }
    let filename = category.imageUrl;
    if (req.file) {
      await removeImage(filename);
      filename = req.file.filename;
    }
    category.name = name;
    category.linkUrl = linkUrl;
    category.imageUrl = filename;
    category.updatedAt = new Date();
    await category.save();
    res.status(200).json({ ...category._doc });
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.body;

    const category = await Category.findById(categoryId);
    category.status = "deleted";
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      throw err;
    }
    const productTypes = category.productTypes;
    await productTypes.forEach(async (productTypeId) => {
      let productType = await ProductTypes.findById(productTypeId);
      productType.status = "deleted";
      let products = productType.products;
      await products.forEach(async (productId) => {
        try {
          let product = await Product.findById(productId);
          product.status = "deleted";
          await product.save();
        } catch (error) {
          next(error);
        }
      });
      await productType.save();
    });
    await category.save();
    await removeImage(category.imageUrl);
    res.status(200).json({ message: "Delete success!!" });
  } catch (error) {}
};

exports.postAddProductTypes = async (req, res, next) => {
  try {
    const { name, linkUrl, rootLink } = req.body;
    const checkProductTypesExisting = await ProductTypes.findOne({
      $or: [{ name: { $regex: new RegExp(name, "i") } }, { linkUrl: linkUrl }],
    });
    if (checkProductTypesExisting) {
      const err = new Error("This product type has been existing!");
      err.statusCode = 400;
      throw err;
    }
    const category = await Category.findOne({ linkUrl: rootLink });
    const newProductType = new ProductTypes({
      name,
      linkUrl,
      category: category._id,
    });
    const createdProductType = await newProductType.save();
    category.productTypes.push(createdProductType._id);
    await category.save();
    res.status(201).json(createdProductType._doc);
  } catch (error) {
    next(error);
  }
};

exports.putEditProductTypes = async (req, res, next) => {
  try {
    const { _id, name, linkUrl, rootUrl } = req.body;
    let productTypes = await ProductTypes.findById(_id);
    if (!productTypes) {
      const err = new Error("Product Types not found");
      err.statusCode = 400;
      throw err;
    }
    const category = await Category.findOne({ productTypes: _id });

    if (category && category.linkUrl !== rootUrl) {
      category.productTypes.pull(_id);
      await category.save();
    }
    const newCategory = await Category.findOne({ linkUrl: rootUrl });
    productTypes.name = name;
    productTypes.linkUrl = linkUrl;
    productTypes.category = newCategory._id;
    let updatedProductType = await productTypes.save();
    newCategory.productTypes.push(_id);
    await newCategory.save();
    res.status(200).json(updatedProductType._doc);
  } catch (error) {
    next(error);
  }
};

exports.deleteProductTypes = async (req, res, next) => {
  try {
    const { id } = req.body;
    const productType = await ProductTypes.findById(id);
    if (!productType) {
      const err = new Error("Product type not found");
      err.statusCode = 404;
      throw err;
    }
    await ProductTypes.findByIdAndDelete(id);
    //find category which contained productType
    const category = await Category.findOne({ productTypes: id });
    if (category) {
      category.productTypes.pull(id);
      await category.save();
    }
    res.status(200).json({ msg: "remove Success" });
  } catch (error) {
    next(error);
  }
};
