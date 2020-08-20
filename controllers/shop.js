const Category = require("../models/category");
const ProductTypes = require("../models/product-types");
const Image = require("../models/images");
const Product = require("../models/product");
const User = require("../models/user");
const fs = require("fs-extra");
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
exports.getListProductTypesByCategoryId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ProductTypes.find({ category: id });
    res.status(200).json(data);
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
exports.postCreateProduct = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const {
      categoryId,
      productTypeId,
      rootUrl,
      name,
      tags,
      price,
      discount,
      discountExpDate,
      description,
      information,
      manufactor,
    } = req.body;
    //set name url for product
    const match = /[A-Za-z0-9]/;
    const nameUrl = name
      .split(" ")
      .filter((character) => match.test(character))
      .concat([Date.now()])
      .join("-")
      .toLowerCase();
    const newProduct = new Product({
      name,
      tags,
      linkUrl: `${rootUrl}/${nameUrl}`,
      discount:
        discount && discountExpDate
          ? {
              value: +discount,
              start_at: new Date(),
              end_at: discountExpDate,
            }
          : null,
      price,
      description,
      information,
      user: req.user._id,
      productType: productTypeId,
      category: categoryId,
      manufactor,
    });
    const user = await User.findById(req.user._id);
    const productType = await ProductTypes.findById(productTypeId);
    if (!user) {
      const error = new Error("User has not existed");
      error.statusCode = 404;
      throw error;
    }

    if (!productType) {
      const error = new Error("Category has not existed");
      error.statusCode = 404;
      throw error;
    }
    await newProduct.save();
    user.products.push(newProduct);
    productType.products.push(newProduct);
    await user.save();
    await productType.save();

    //generate base 64image to save in db
    console.log(req.files);
    const listBase64ImagePromise = req.files.map(async (file) => {
      const data = await fs.readFile(file.path, "base64");
      const mimetype = file.mimetype;
      const name = file.originalname;
      return { data, mimetype, name };
    });
    const listBase64Image = await Promise.all(listBase64ImagePromise);
    console.log(listBase64Image);
    const listImagesPromise = listBase64Image.map(
      async ({ name, data, mimetype }) => {
        let newImage = new Image({
          name,
          data,
          mimetype,
          product: newProduct,
        });
        await newImage.save();
        return newImage._id;
      }
    );
    const listImages = await Promise.all(listImagesPromise);
    newProduct.images = [...listImages];
    await newProduct.save();
    req.files.forEach(async (file) => {
      await fs.unlink(file.path);
    });
    res.status(200).json(newProduct);
  } catch (error) {
    next(error);
  }
};
