const Category = require("../models/category");
const ProductTypes = require("../models/product-types");
const Image = require("../models/images");
const Product = require("../models/product");
const User = require("../models/user");
const fs = require("fs-extra");
const mongoose = require("mongoose");
const ProductGroup = require("../models/product-groups");
const validator = require("validator");
const productGroups = require("../models/product-groups");
const path = require("path");
const { v4: uuid } = require("uuid");
exports.getInitialData = async (req, res, next) => {
  try {
    let categoryList = await Category.find({ status: "active" }).populate(
      "productTypes"
    );
    let productTypesList = await ProductTypes.find({
      status: "active",
    }).populate({ path: "products", options: { limit: 6 } });

    const categoryObject = {};
    categoryList.forEach((category) => {
      categoryObject[category._id] = {
        productType: productTypesList.filter(
          (productType) =>
            productType.category.toString() === category._id.toString()
        ),
      };
    });

    res.status(200).json({
      category: categoryList,
      menu: categoryObject,
    });
  } catch (error) {
    next(error);
  }
};
exports.getCategoryList = async (req, res, next) => {
  try {
    const searchKey = req.query.search || "";
    if (searchKey) {
      const categoryFilter = await Category.find({
        $and: [
          {
            $or: [
              { name: { $regex: new RegExp(searchKey, "i") } },
              { linkUrl: { $regex: new RegExp(searchKey, "i") } },
            ],
          },
          { status: "active" },
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
    const data = await ProductTypes.find({ category: id, status: "active" });
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getProductGroupByProductTypeId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ProductGroup.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

exports.getListProductGroupByProducTypeId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await ProductTypes.findById(id).populate("productGroups");
    res.status(200).json(data.productGroups);
  } catch (error) {
    next(error);
  }
};

exports.getProductTypes = async (req, res, next) => {
  try {
    const searchKey = req.query.search || "";
    if (searchKey) {
      const categoryFilter = await ProductTypes.find({
        $and: [
          {
            $or: [
              { name: { $regex: new RegExp(searchKey, "i") } },
              { linkUrl: { $regex: new RegExp(searchKey, "i") } },
            ],
          },
          {
            status: "active",
          },
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
    const productTypes = await ProductTypes.findOne({
      _id: id,
      status: "active",
    }).populate("category");
    res.status(200).json(productTypes);
  } catch (error) {
    next(error);
  }
};

exports.getListLinksProductTypes = async (req, res, next) => {
  try {
    const { id } = req.query;
    const category = await Category.findOne({ _id: id, status: "active" });
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
exports.getMenu = async (req, res, next) => {
  try {
    let menu = {};
    const category = await Category.find().populate("productTypes");
    for await (let categoryItem of category) {
      menu[categoryItem._id] = {
        _id: categoryItem._id,
        name: categoryItem.name,
        linkUrl: categoryItem.linkUrl,
      };
      let productTypes = [];
      let count = 0;
      for await (let productTypeItem of categoryItem.productTypes) {
        let productType = {
          name: productTypeItem.name,
          linkUrl: productTypeItem.linkUrl,
          productsMenu: [],
        };
        let length;
        if (productTypeItem.productGroups.length) {
          length = productTypeItem.productGroups.length;
          productTypeItem = await productTypeItem
            .populate({
              path: "productGroups",
              select: ["_id", "name", "linkUrl"],
              options: {
                limit: 6,
              },
            })
            .execPopulate();
          for await (let group of productTypeItem.productGroups) {
            productType.productsMenu.push({
              _id: group._id,
              name: group.name,
              linkUrl: group.linkUrl,
              options: {
                limit: 6,
                sort: { sold: -1 },
              },
            });
          }
        } else if (productTypeItem.products.length) {
          length = productTypeItem.products.length;
          productTypeItem = await productTypeItem
            .populate({
              path: "products",
              select: ["_id", "name", "linkUrl"],
            })
            .execPopulate();
          for await (let product of productTypeItem.products) {
            productType.productsMenu.push({
              _id: product._id,
              name: product.name,
              linkUrl: product.linkUrl,
            });
          }
        }
        if (productType.productsMenu.length) {
          productTypes.push(productType);
        }

        count += 1;
        if (count == 5 || count == length) {
          let manufactorOfProductType = {
            name: "Nhà sản xuất",
            linkUrl: productTypeItem + "/manufactors",
            productsMenu: [],
          };
          productTypeItem = await productTypeItem
            .populate({
              path: "products",
              select: ["_id", "name", "linkUrl", "manufactor"],
            })
            .execPopulate();
          for await (let product of productTypeItem.products) {
            manufactorOfProductType.productsMenu.push({
              _id: uuid(),
              name: product.manufactor,
              linkUrl: "manufactor/" + product.manufactor.trim(),
            });
          }
          productTypes.push(manufactorOfProductType);
          break;
        }
      }
      menu[categoryItem._id].productTypes = productTypes;
    }
    res.status(200).json(JSON.stringify(menu));
  } catch (error) {
    next(error);
  }
};
exports.postCreateMenu = async (req, res, next) => {
  try {
    const dataJSON = req.body;
    await fs.writeFile(
      path.join(
        path.dirname(require.main.filename),
        "client",
        "src",
        "data",
        "menu.json"
      ),
      JSON.stringify(dataJSON)
    );
    res.status(201).json({ msg: "created success" });
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
    const errorsArr = [];
    let {
      categoryId,
      productTypeId,
      productGroupId,
      groupName,
      rootUrl,
      label,
      name,
      price,
      discount,
      discountExpDate,
      description,
      information,
      manufactor,
    } = req.body;

    // set name url for product
    const match = /[A-Za-z0-9]/;
    const nameUrl = name
      .split(" ")
      .filter((character) => match.test(character))
      .concat([Date.now()])
      .join("-")
      .toLowerCase();
    const product = await Product.findOne({
      name: new RegExp(["^", name, "$"].join(""), "i"),
    });
    if (product) {
      name = name + "|" + Date.now();
    }
    const newProduct = new Product({
      label,
      name,
      linkUrl: `${rootUrl}/${encodeURIComponent(nameUrl)}`,
      price,
      description,
      information,
      user: req.user._id,
      productType: productTypeId,
      category: categoryId,
      manufactor,
    });

    if (+discount > 0 && discountExpDate) {
      newProduct.discount = {
        value: +discount,
        start_at: new Date(),
        end_at: discountExpDate,
      };
    }
    const user = await User.findById(req.user._id);
    const productType = await ProductTypes.findOne({
      _id: productTypeId,
      status: "active",
    }).populate("productGroups");
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
    if (!productGroupId) {
      if (groupName) {
        let newProductGroup = new ProductGroup({
          name: groupName,
          linkUrl: `${productType.linkUrl}/${encodeURIComponent(
            groupName.toLowerCase()
          )}`,
          productType: productType,
          products: [newProduct],
        });

        let findGroupName = productType.productGroups.find(
          (item) =>
            item.name.toLowerCase().trim() === groupName.toLowerCase().trim()
        );
        if (!findGroupName) {
          await newProductGroup.save();
          newProduct.productGroup = mongoose.Types.ObjectId(
            newProductGroup._id
          );
          productType.productGroups.push(
            mongoose.Types.ObjectId(newProductGroup._id)
          );
        } else {
          const err = new Error("Product Group Name has been existing");
          err.statusCode = 400;
          throw err;
        }
      }
    } else {
      const productGroup = await ProductGroup.findById(productGroupId);
      if (!productGroup) {
        const err = new Error("Product Group not found");
        err.statusCode = 404;
        throw err;
      }
      productGroup.products.push(newProduct);
      await productGroup.save();
      newProduct.productGroup = productGroup._id;
    }

    await newProduct.save();
    user.products.push(newProduct);
    productType.products.push(newProduct);
    const checkManufactorExisted = productType.manufactors.find(
      (item) => item.toLowerCase() == manufactor.toLowerCase()
    );
    if (!checkManufactorExisted) {
      productType.manufactors.push(manufactor);
    }
    await user.save();
    await productType.save();

    //generate base 64image to save in db
    const listBase64ImagePromise = req.files.map(async (file) => {
      const data = await fs.readFile(file.path, "base64");
      const mimetype = file.mimetype;
      const name = file.originalname;
      return { data, mimetype, name };
    });
    const listBase64Image = await Promise.all(listBase64ImagePromise);
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
    res.status(200).json({ msg: "product created" });
  } catch (error) {
    next(error);
  }
};

exports.getLatestProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(12);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
