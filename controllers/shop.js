const Category = require("../models/category");
const ProductTypes = require("../models/product-types");
const Image = require("../models/images");
const Product = require("../models/product");
const User = require("../models/user");
const Manufactor = require("../models/manufactor");
const fs = require("fs-extra");
const mongoose = require("mongoose");
const ProductGroup = require("../models/product-groups");
const removeImage = require("../utils/removeImage");
const validator = require("validator");
const productGroups = require("../models/product-groups");
const _ = require("lodash");
const { toCapitalizeString } = require("../utils/algorithms");
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
    const categoryList = await Category.find().populate("imageUrl").limit(15);

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
    //to Capitalize name
    name = toCapitalizeString(name);
    label = toCapitalizeString(label);
    manufactor = toCapitalizeString(manufactor);
    groupName = toCapitalizeString(groupName);
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
      linkUrl: `${rootUrl}/${encodeURIComponent(name + Date.now())}`,
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
    let group;
    //save at product groups model
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
          group = newProductGroup;
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
      group = productGroup;
      newProduct.productGroup = productGroup._id;
    }

    //check manufactor manufactors model
    let manufactorDoc = await Manufactor.findOne({
      name: { $regex: new RegExp(`^${manufactor}$`, "i") },
    });
    if (!manufactorDoc) {
      manufactorDoc = new Manufactor({
        name: manufactor,
        linkUrl: `/manufactor/${encodeURIComponent(manufactor)}`,
      });
    }
    manufactorDoc.products.push(newProduct._id);
    if (group) {
      manufactorDoc.productGroups.push(group._id);
    }
    newProduct.manufactor = manufactorDoc._id;
    productType.manufactors.push(manufactorDoc._id);
    await manufactorDoc.save();

    await newProduct.save();
    user.products.push(newProduct);
    productType.products.push(newProduct);
    const checkManufactorExisted = await Manufactor.findOne({
      name: { $regex: new RegExp(`^${manufactor}$`, "i") },
    });
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
      await removeImage(file.filename);
    });
    res.status(200).json({ msg: "product created" });
  } catch (error) {
    next(error);
  }
};

exports.getLatestProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("images")
      .sort({ createdAt: -1 })
      .limit(12);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getBestSellerProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("images")
      .sort({ sold_quantity: -1 })
      .limit(12);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getTopRatedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ stars: { $gt: 4 } })
      .populate("images")
      .sort({ stars: -1 })
      .limit(12);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductListPerPageByCategoryLink = async (req, res, next) => {
  try {
    let { linkUrl } = req.params;
    const page = +req.query.page;
    if (linkUrl[0] !== "/") {
      linkUrl = "/" + linkUrl;
    }
    const category = await Category.findOne({
      linkUrl: linkUrl,
      status: "active",
    });
    if (!category) {
      const err = new Error("category not found");
      err.statusCode = 404;
      throw err;
    }
    const product = await Product.find({
      category: category._id,
      status: "active",
    })
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
exports.getContentListByCategoryLinkUrl = async (req, res, next) => {
  try {
    let { pathUrl } = req.params;
    const page = +req.query.page;
    console.log(page);
    if (pathUrl[0] !== "/") {
      pathUrl = "/" + pathUrl;
    }
    console.time("start");
    const category = await Category.findOne({
      linkUrl: pathUrl,
      status: "active",
    }).populate("productTypes");
    if (!category) {
      const err = new Error("Page not found");
      err.statusCode = 404;
      throw err;
    }
    const discountProductList = await Product.find({
      category: category._id,
      "discount.value": { $gt: 0 },
      "discount.end_at": { $gt: new Date() },
      status: "active",
    })
      .populate("images")
      .sort({ discount: -1 })
      .limit(9);
    const topRatedProducts = await Product.find({
      category: category._id,
      status: "active",
      stars: { $exists: true },
    })
      .populate("images")
      .sort({ stars: -1 })
      .limit(9);
    const bestSellerProducts = await Product.find({
      category: category._id,
      sold_quantity: { $gt: 0 },
      status: "active",
    })
      .populate("images")
      .sort({ sold_quantity: -1 })
      .limit(9);
    const productList = await Product.find({
      category: category._id,
      status: "active",
    })
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    const numProducts = await Product.countDocuments({
      category: category._id,
      status: "active",
    });
    const maxPrice = await Product.findOne(
      {
        category: category._id,
        status: "active",
      },
      { price: 1, _id: 0 }
    ).sort({ price: -1 });

    const numPages = Math.ceil(numProducts / +process.env.PRODUCTS_PER_PAGE);
    console.timeEnd("start");
    res.status(200).json({
      categoryList: category,
      productTypeList: category.productTypes,
      discountProductList,
      topRatedProducts,
      bestSellerProducts,
      productList,
      numProducts,
      numPages,
      maxPrice: maxPrice.price,
    });
  } catch (error) {
    next(error);
  }
};
exports.getListContentByProductTypeUrl = async (req, res, next) => {
  try {
    let { categoryUrl, productTypeUrl } = req.params;
    const page = +req.query.page;
    console.log(categoryUrl, productTypeUrl, page);
    if (categoryUrl[0] !== "/") {
      categoryUrl = "/" + categoryUrl;
    }
    if (productTypeUrl[0] !== "/") {
      productTypeUrl = "/" + productTypeUrl;
    }
    console.time("start");
    let productType = await ProductTypes.findOne({
      linkUrl: categoryUrl + productTypeUrl,
      status: "active",
    })
      .populate("productGroups")
      .populate("manufactors");
    if (!productType) {
      const err = new Error("Page not found");
      err.statusCode = 404;
      throw err;
    }
    const manufactorList = productType.manufactors;
    const discountProductList = await Product.find({
      productType: productType._id,
      "discount.value": { $gt: 0 },
      "discount.end_at": { $gt: new Date() },
      status: "active",
    })
      .populate("images")
      .sort({ discount: -1 })
      .limit(9);

    const topRatedProducts = await Product.find({
      productType: productType._id,
      stars: { $exists: true },
      status: "active",
    })
      .populate("images")
      .sort({ stars: -1 })
      .limit(9);
    const bestSellerProducts = await Product.find({
      productType: productType._id,
      sold_quantity: { $gt: 0 },
      status: "active",
    })
      .populate("images")
      .sort({ sold_quantity: -1 })
      .limit(9);
    const productList = await Product.find({
      productType: productType._id,
      status: "active",
    })
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    const numProducts = await Product.countDocuments({
      productType: productType._id,
      status: "active",
    });
    const maxPrice = await Product.findOne(
      {
        productType: productType._id,
        status: "active",
      },
      { price: 1, _id: 0 }
    ).sort({ price: -1 });

    const numPages = Math.ceil(numProducts / +process.env.PRODUCTS_PER_PAGE);
    console.timeEnd("start");
    res.status(200).json({
      name: productType.name,
      productGroupList: productType.productGroups,
      manufactorList,
      discountProductList,
      topRatedProducts,
      bestSellerProducts,
      productList,
      numProducts,
      numPages,
      maxPrice: maxPrice.price,
    });
  } catch (error) {
    next(error);
  }
};
exports.getProductListWithSpecificPageByProductTypeUrl = async (
  req,
  res,
  next
) => {
  try {
    let { categoryUrl, productTypeUrl } = req.params;
    const page = +req.query.page;
    if (categoryUrl[0] !== "/") {
      categoryUrl = "/" + categoryUrl;
    }
    if (productTypeUrl[0] !== "/") {
      productTypeUrl = "/" + productTypeUrl;
    }
    const productType = await ProductTypes.findOne({
      linkUrl: categoryUrl + productTypeUrl,
      status: "active",
    });
    if (!productType) {
      const err = new Error("product Type not found");
      err.statusCode = 404;
      throw err;
    }
    const productList = await Product.find({
      productType: productType._id,
      status: "active",
    })
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    res.status(200).json(productList);
  } catch (error) {
    next(error);
  }
};
exports.getListContentByManufactorUrl = async (req, res, next) => {
  try {
    console.time("manufactor");
    const { manufactorUrl } = req.params;
    const page = +req.query.page;
    const manufactor = await Manufactor.findOne({
      linkUrl: { $regex: new RegExp(`/manufactor/${manufactorUrl}`, "i") },
    })
      .populate("products")
      .populate("productGroups");
    if (!manufactor) {
      const err = new Error("Manufactor not found");
      err.statusCode = 404;
      throw err;
    }
    const productList = await Product.find({
      manufactor: manufactor._id,
      status: "active",
    })
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    const productGroupList = manufactor.productGroups;
    const numProducts = await Product.countDocuments({
      manufactor: manufactor._id,
      status: "active",
    });
    const numPages = Math.ceil(numProducts / +process.env.PRODUCTS_PER_PAGE);
    const maxPrice = await Product.findOne(
      {
        manufactor: manufactor._id,
        status: "active",
      },
      { price: 1, _id: 0 }
    )
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    console.timeEnd("manufactor");
    res.status(200).json({
      name: manufactor.name,
      productGroupList,
      productList,
      numProducts,
      numPages,
      maxPrice: maxPrice.price,
    });
  } catch (error) {
    next(error);
  }
};
exports.getListProdudctPerPageByManufactorUrl = async (req, res, next) => {
  try {
    console.time("manufactor");
    const { manufactorUrl } = req.params;
    const page = +req.query.page;

    const manufactor = await Manufactor.findOne({
      linkUrl: { $regex: new RegExp(`/manufactor/${manufactorUrl}`, "i") },
    })
      .populate("products")
      .populate("productGroups");

    if (!manufactor) {
      const err = new Error("Manufactor not found");
      err.statusCode = 404;
      throw err;
    }
    const productList = await Product.find({
      manufactor: manufactor._id,
      status: "active",
    })
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    console.time("manufactor");
    res.status(200).json(productList);
  } catch (error) {
    next(error);
  }
};
