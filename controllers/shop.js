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
const productGroups = require("../models/product-groups");
const Comment = require("../models/comments");
const Vote = require("../models/vote");
const _ = require("lodash");
const { toCapitalizeString } = require("../utils/algorithms");
const path = require("path");
const { populate } = require("../models/category");
const vote = require("../models/vote");
const Response = require("../models/response");
const encodeLinkUrl = require("../utils/encodeUrl");
const connectDB = require("../config/connectDB");
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
      quantity,
      weight,
      ship_fee,
    } = req.body;
    //to Capitalize name
    name = toCapitalizeString(name);
    label = toCapitalizeString(label);
    manufactor = toCapitalizeString(manufactor);
    groupName = toCapitalizeString(groupName);
    // set name url for product
    const match = /[A-Za-z0-9]/;
    const product = await Product.findOne({
      name: new RegExp(["^", name, "$"].join(""), "i"),
    });
    if (product) {
      name = name + "|" + Date.now();
    }
    const newProduct = new Product({
      label,
      name,
      linkUrl: `${rootUrl}/${encodeLinkUrl(name.toLowerCase())}`,
      price,
      description,
      information,
      user: req.user._id,
      productType: productTypeId,
      category: categoryId,
      manufactor,
      quantity,
      weight,
      ship_fee,
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
          linkUrl: `${productType.linkUrl}/product-group/${encodeLinkUrl(
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
        linkUrl: `/manufactor/${encodeLinkUrl(manufactor.toLowerCase())}`,
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
    const products = await Product.find({}, { images: { $slice: 1 } })
      .populate({ path: "images" })
      .sort({ createdAt: -1 })
      .limit(12);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

exports.getBestSellerProducts = async (req, res, next) => {
  try {
    const products = await Product.find({}, { images: { $slice: 1 } })
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
    const products = await Product.find(
      { stars: { $gt: 4 } },
      { images: { $slice: 1 } }
    )
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
    console.time("getProductListPerPageByCategoryLink");
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
    console.timeEnd("getProductListPerPageByCategoryLink");
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
exports.getContentListByCategoryLinkUrl = async (req, res, next) => {
  try {
    console.time("getContentListByCategoryLinkUrl");
    let { categoryPath } = req.params;
    const page = +req.query.page;
    if (categoryPath[0] !== "/") {
      categoryPath = "/" + categoryPath;
    }
    console.time("start");
    const category = await Category.findOne({
      linkUrl: categoryPath,
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
    console.timeEnd("getContentListByCategoryLinkUrl");
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
exports.getProductListInCategoryByFilterPrice = async (req, res, next) => {
  try {
    console.time("getProductListInCategoryByFilterPrice");
    let { categoryPath } = req.params;
    const page = +req.query.page;
    const minPrice = +req.query.min_price;
    const maxPrice = +req.query.max_price;
    if (categoryPath[0] !== "/") {
      categoryPath = "/" + categoryPath;
    }
    const category = await Category.findOne({ linkUrl: categoryPath });
    console.timeEnd("getProductListInCategoryByFilterPrice");
    if (!category) {
      const error = new Error("category not found");
      error.statusCode = 404;
      throw error;
    }
    const productList = await Product.find(
      {
        category: category._id,
        status: "active",
        price: { $gte: minPrice, $lte: maxPrice },
      },
      { images: { $slice: 1 } }
    )
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    const numProducts = await Product.countDocuments({
      category: category._id,
      status: "active",
      price: { $gte: minPrice, $lte: maxPrice },
    });

    const numPages = Math.ceil(numProducts / process.env.PRODUCTS_PER_PAGE);
    const productMaxPrice = await Product.findOne(
      {
        category: category._id,
        status: "active",
      },
      { price: 1, _id: 0 }
    ).sort({ price: -1 });
    console.timeEnd("getProductListByFilterPriceInProductType");
    res.status(200).json({
      categoryList: category,
      productList,
      numProducts,
      currentPage: page,
      numPages,
      maxPrice: productMaxPrice.price,
    });
  } catch (error) {
    next(error);
  }
};
exports.getListContentByProductTypeUrl = async (req, res, next) => {
  try {
    let { categoryPath, productTypePath } = req.params;
    const page = +req.query.page;
    if (categoryPath[0] !== "/") {
      categoryPath = "/" + categoryPath;
    }
    if (productTypePath[0] !== "/") {
      productTypePath = "/" + productTypePath;
    }
    console.time("start");
    let productType = await ProductTypes.findOne({
      linkUrl: categoryPath + productTypePath,
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
exports.getProductListByFilterPriceInProductType = async (req, res, next) => {
  try {
    console.time("getProductListByFilterPriceInProductType");
    let { categoryPath, productTypePath } = req.params;
    const page = +req.query.page;
    const minPrice = +req.query.min_price;
    const maxPrice = +req.query.max_price;
    if (categoryPath[0] !== "/") {
      categoryPath = "/" + categoryPath;
    }
    if (productTypePath[0] !== "/") {
      productTypePath = "/" + productTypePath;
    }
    const productType = await ProductTypes.findOne({
      linkUrl: categoryPath + productTypePath,
      status: "active",
    });
    if (!productType) {
      const err = new Error("product Type not found");
      err.statusCode = 404;
      throw err;
    }
    const productList = await Product.find(
      {
        productType: productType._id,
        status: "active",
        price: { $gte: minPrice, $lte: maxPrice },
      },
      { images: { $slice: 1 } }
    )
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    const numProducts = await Product.countDocuments({
      productType: productType._id,
      status: "active",
      price: { $gte: minPrice, $lte: maxPrice },
    });
    const numPages = Math.ceil(numProducts / process.env.PRODUCTS_PER_PAGE);
    const productMaxPrice = await Product.findOne(
      {
        productType: productType._id,
        status: "active",
      },
      { price: 1, _id: 0 }
    ).sort({ price: -1 });
    console.timeEnd("getProductListByFilterPriceInProductType");
    res.status(200).json({
      productList,
      numProducts,
      currentPage: page,
      numPages,
      maxPrice: productMaxPrice.price,
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
    let { categoryPath, productTypePath } = req.params;
    const page = +req.query.page;
    if (categoryPath[0] !== "/") {
      categoryPath = "/" + categoryPath;
    }
    if (productTypePath[0] !== "/") {
      productTypePath = "/" + productTypePath;
    }
    const productType = await ProductTypes.findOne({
      linkUrl: categoryPath + productTypePath,
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
    console.time("getListContentByManufactorUrl");
    const { manufactorPath } = req.params;
    const page = +req.query.page;
    const manufactor = await Manufactor.findOne({
      linkUrl: {
        $regex: new RegExp(
          `/manufactor/${encodeURIComponent(manufactorPath)}`,
          "i"
        ),
      },
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
    const productMaxPrice = await Product.findOne(
      {
        manufactor: manufactor._id,
        status: "active",
      },
      { price: 1, _id: 0 }
    ).sort({ price: -1 });
    console.timeEnd("getListContentByManufactorUrl");
    res.status(200).json({
      name: manufactor.name,
      productGroupList,
      productList,
      numProducts,
      numPages,
      maxPrice: productMaxPrice.price,
    });
  } catch (error) {
    next(error);
  }
};
exports.getProductListInManufactorByFilterPrice = async (req, res, next) => {
  try {
    console.time("getProductListInManufactorByFilterPrice");
    const { manufactorPath } = req.params;
    const page = +req.query.page;
    const minPrice = +req.query.min_price;
    const maxPrice = +req.query.max_price;
    let manufactorUrl = `/manufactor/${encodeURIComponent(manufactorPath)}`;
    const manufactor = await Manufactor.findOne({
      linkUrl: manufactorUrl,
    })
      .populate("products")
      .populate("productGroups");
    if (!manufactor) {
      const err = new Error("Manufactor not found");
      err.statusCode = 404;
      throw err;
    }
    console.log(manufactor);
    const productList = await Product.find(
      {
        manufactor: manufactor._id,
        status: "active",
        price: { $gte: minPrice, $lte: maxPrice },
      },
      { images: { $slice: 1 } }
    )
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    const productGroupList = manufactor.productGroups;
    const numProducts = await Product.countDocuments({
      manufactor: manufactor._id,
      status: "active",
      price: { $gte: minPrice, $lte: maxPrice },
    });
    const numPages = Math.ceil(numProducts / +process.env.PRODUCTS_PER_PAGE);
    const productMaxPrice = await Product.findOne(
      {
        manufactor: manufactor._id,
        status: "active",
      },
      { price: 1, _id: 0 }
    ).sort({ price: -1 });

    console.timeEnd("getProductListInManufactorByFilterPrice");
    res.status(200).json({
      name: manufactor.name,
      productGroupList,
      productList,
      numProducts,
      numPages,
      maxPrice: productMaxPrice.price,
    });
  } catch (error) {
    next(error);
  }
};
exports.getListProdudctPerPageByManufactorUrl = async (req, res, next) => {
  try {
    console.time("getListProdudctPerPageByManufactorUrl");
    const { manufactorPath } = req.params;
    const page = +req.query.page;

    const manufactor = await Manufactor.findOne({
      linkUrl: {
        $regex: new RegExp(
          `/manufactor/${encodeURIComponent(manufactorPath)}`,
          "i"
        ),
      },
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
    console.time("getListProdudctPerPageByManufactorUrl");
    res.status(200).json(productList);
  } catch (error) {
    next(error);
  }
};

exports.getListContentProductGroup = async (req, res, next) => {
  try {
    const { categoryPath, productTypePath, productGroupPath } = req.params;
    const page = +req.query.page;
    const linkUrl = `/${categoryPath}/${productTypePath}/product-group/${encodeURIComponent(
      productGroupPath
    )}`;
    const productGroup = await ProductGroup.findOne({
      linkUrl,
    });
    const discountProductList = await Product.find({
      productGroup: productGroup._id,
      "discount.value": { $gt: 0 },
      "discount.end_at": { $gt: new Date() },
      status: "active",
    })
      .populate("images")
      .sort({ discount: -1 })
      .limit(9);

    const topRatedProducts = await Product.find({
      productGroup: productGroup._id,
      stars: { $exists: true },
      status: "active",
    })
      .populate("images")
      .sort({ stars: -1 })
      .limit(9);
    const bestSellerProducts = await Product.find({
      productGroup: productGroup._id,
      sold_quantity: { $gt: 0 },
      status: "active",
    })
      .populate("images")
      .sort({ sold_quantity: -1 })
      .limit(9);
    const productList = await Product.find({ productGroup: productGroup._id })
      .populate("images")
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    const numProducts = await Product.countDocuments({
      productGroup: productGroup._id,
    });
    const numPages = Math.ceil(numProducts / +process.env.PRODUCTS_PER_PAGE);
    const maxPrice = await Product.findOne(
      { productGroup: productGroup._id },
      { price: 1, _id: 0 }
    ).sort({ price: -1 });
    res.status(200).json({
      name: productGroup.name,
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
exports.getListProductGroupPerPageByProductGroupUrl = async (
  req,
  res,
  next
) => {
  try {
    const { categoryPath, productTypePath, productGroupPath } = req.params;
    const page = +req.query.page;
    const linkUrl = `/${categoryPath}/${productTypePath}/product-group/${encodeURIComponent(
      productGroupPath
    )}`;
    const productGroup = await ProductGroup.findOne({ linkUrl });
    if (!productGroup) {
      const err = new Error("Product group not found");
      err.statusCode = 404;
      throw err;
    }
    const productList = await Product.find({
      productGroup: productGroup._id,
      status: "active",
    })
      .populate({ path: "images" })
      .sort({ createdAt: -1 })
      .skip((page - 1) * +process.env.PRODUCTS_PER_PAGE)
      .limit(+process.env.PRODUCTS_PER_PAGE);
    res.status(200).json(productList);
  } catch (error) {
    next(error);
  }
};
exports.getContentProductByProductUrl = async (req, res, next) => {
  try {
    console.time("productDetail");
    const { categoryPath, productTypePath, productPath } = req.params;

    const linkUrl = `/${categoryPath}/${productTypePath}/${encodeURIComponent(
      productPath
    )}`;

    let product = await Product.findOne({ linkUrl })
      .populate("images")
      .populate({ path: "user", select: "_id avatar information" });
    if (!product) {
      const err = new Error("product not found");
      err.statusCode = 404;
      throw err;
    }
    const productGroup = await ProductGroup.findById(product.productGroup);
    let collectionProducts = [];
    if (productGroup) {
      const products = await Product.find({
        productGroup: productGroup._id,
        status: "active",
        _id: { $ne: product._id },
      })
        .populate("images")
        .limit(8);
      collectionProducts = [...collectionProducts, ...products];
    }
    const productType = await ProductTypes.findById(product.productType);
    if (productType) {
      const products = await Product.find({
        productType: productType._id,
        status: "active",
        _id: { $ne: product._id },
      })
        .populate("images")
        .limit(8);
      collectionProducts = [...collectionProducts, ...products];
    }

    let checkProduct = {};
    let relatedProducts = [];
    collectionProducts.forEach((productItem) => {
      if (
        productItem._id.toString() != product._id.toString() &&
        !checkProduct[productItem._id]
      ) {
        relatedProducts.push(productItem);
        checkProduct[productItem._id] = true;
      }
    });
    console.timeEnd("productDetail");
    res.status(200).json({ product, relatedProducts });
  } catch (error) {
    next(error);
  }
};
exports.getProductReviewsById = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    console.time("get product reviews by Id");
    const { productId } = req.params;
    const product = await Product.findById(productId)
      .populate({
        path: "images",
        options: { limit: 1 },
      })
      .populate({ path: "user", select: "information" })
      .populate({ path: "responses" });
    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    //check user has reviewed or not
    let __product = product._doc;
    const myVoteReview = await Vote.findOne({
      product: product._id,
      user: req.user._id,
    });
    __product.my_vote_review = myVoteReview;
    const myCommentReview = await Comment.findOne({
      product: product._id,
      user: req.user._id,
    });
    __product.my_comment_review = myCommentReview;
    __product.numberOfVotes = __product.votes.length;
    delete __product.votes;
    delete __product.comments;
    console.timeEnd("get product reviews by Id");
    res.status(200).json(__product);
  } catch (error) {
    next(error);
  }
};
exports.postProductReviewsById = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { productId } = req.params;
    let { stars, comment } = req.body;
    stars = +stars == 0 ? 1 : +stars;
    const product = await Product.findById(productId).populate("votes");
    if (comment) {
      const newComment = new Comment({
        product: productId,
        user: req.user._id,
        text: comment,
      });
      product.comments.push(newComment._id);
      //save commentId at user
      user.comments.push(newComment._id);
      await newComment.save();
    }
    if (stars) {
      const newVote = new Vote({
        product: productId,
        user: req.user._id,
        value: stars,
      });
      if (product.votes.length) {
        const totalScores = product.votes.reduce(
          (accumulator, item) => accumulator + parseFloat(item.value),
          +stars
        );
        product.stars = totalScores / (product.votes.length + 1);
      } else {
        product.stars = stars;
      }
      user.votes.push(newVote._id);
      product.votes.push(newVote);
      await newVote.save();
    }
    await product.save();
    await user.save();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
exports.updateProductReviewById = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { productId } = req.params;
    let { stars, comment, updatedMyReview } = req.body;
    const product = await Product.findById(productId).populate({
      path: "votes",
      select: "value",
    });
    if (!product || product.status !== "active") {
      const error = new Error("Product was not found or disabled");
      error.statusCode = 404;
      throw error;
    }

    stars = +stars == 0 ? 1 : +stars;

    if (stars) {
      if (updatedMyReview.updatedVote) {
        const vote = await Vote.findById(updatedMyReview.updatedVote._id);
        if (!vote) {
          const error = new Error("Vote not found");
          error.statusCode = 404;
          throw error;
        }
        const totalScores = product.votes.reduce((accumulator, item) => {
          if (item._id === vote._id) {
            return accumulator + stars;
          }
          return accumulator + parseFloat(item.value);
        }, 0);
        product.stars = totalScores / product.votes.length;
        vote.value = stars;
        await vote.save();
      } else {
        const newVote = new Vote({
          product: productId,
          user: req.user._id,
          value: stars,
        });
        if (product.votes.length) {
          const totalScores = product.votes.reduce(
            (accumulator, item) => accumulator + parseFloat(item.value),
            +stars
          );
          product.stars = totalScores / (product.votes.length + 1);
        } else {
          product.stars = stars;
        }
        product.votes.push(newVote);
        await newVote.save();
        await user.save();
      }
    }
    if (comment) {
      if (updatedMyReview.updatedComment) {
        const oldComment = await Comment.findById(
          updatedMyReview.updatedComment._id
        );
        if (!oldComment) {
          const error = new Error("Comment not found");
          error.statusCode = 404;
          throw error;
        }
        oldComment.text = comment;
        await oldComment.save();
      } else {
        const newComment = new Comment({
          product: productId,
          user: req.user._id,
          text: comment,
        });
        product.comments.push(newComment._id);
        user.comments.push(newComment._id);
        await newComment.save();
        await user.save();
      }
    }
    await product.save();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
exports.getCommentReviewsByProductId = async (req, res, next) => {
  try {
    console.time("start-get-comment-review");
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product || product.status !== "active") {
      const error = new Error("Product not found or disabled");
      error.statusCode = 404;
      throw error;
    }
    let commentList = {
      comments: [],
    };
    //count all comments and responses
    let countComments = await Comment.countDocuments({ product: productId });
    let comments = await Comment.find({ product: productId });
    let countResponses = 0;
    for await (let comment of comments) {
      countResponses += await Response.countDocuments({ comment: comment._id });
    }
    commentList.countCommentsAndResponses = countComments + countResponses;
    comments = await Comment.find({ product: productId })
      .populate("user")
      .sort({ createdAt: -1 })
      .limit(+process.env.COMMENT_AND_RESPONSE_COMMENT_LIMIT);
    const userCreateProduct = await product.user;
    let responseList = [];
    for await (let comment of comments) {
      let __comment = comment._doc;
      let responses = await Response.find({ comment: comment._id })
        .populate({
          path: "user",
          select: "_id avatar google.name facebook.name local.name",
        })
        .sort({ createdAt: -1 })
        .limit(+process.env.COMMENT_AND_RESPONSE_COMMENT_LIMIT);

      responseList = [...responseList, ...responses];
      let countCommentResponses = await Response.countDocuments({
        comment: comment._id,
      });
      if (__comment.responses.length == comment.responses.length) {
        __comment.responses = [];
      }
      __comment.responses.push(responses.map((response) => response._id));
      __comment.countCommentResponses = countCommentResponses;
      __comment.user = {
        name:
          __comment.user.facebook.name ||
          __comment.user.google.name ||
          __comment.user.local.name,
        avatar: __comment.user.avatar,
        _id: __comment.user._id,
      };

      if (userCreateProduct == __comment.user._id) {
        commentList.comments.unshift(__comment);
      } else {
        commentList.comments.push(__comment);
      }
    }
    console.timeEnd("start-get-comment-review");
    res.status(200).json({
      comments: commentList.comments,
      responses: responseList,
      numberOfComments: countComments,
      numberOfCommentsAndResponses: commentList.countCommentsAndResponses,
    });
  } catch (error) {
    next(error);
  }
};
exports.postLikeOrUnlikeComment = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { commentId } = req.params;
    if (!commentId) {
      const error = new Error("request error");
      throw error;
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error("Comment not found");
      error.statusCode = 404;
      throw error;
    }
    //check user has liked this comment.If user has liked, remove this like, otherwise add like to this comment
    // check user has disliked this comment. If user has disliked, remove disliked;
    comment.dislikes.pull(req.user._id);
    const checkUserHasLiked = comment.likes.find(
      (userId) => userId == req.user._id
    );
    if (checkUserHasLiked) {
      comment.likes.pull(req.user._id);
      await comment.save();
      return res.status(200).json({ msg: "unlike success" });
    }
    comment.likes.push(req.user._id);
    await comment.save();
    res.status(200).json({ msg: "like success" });
  } catch (error) {
    next(error);
  }
};
exports.postDislikeOrUndislikeComment = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { commentId } = req.params;
    if (!commentId) {
      const error = new Error("request error");
      throw error;
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error("Comment not found");
      error.statusCode = 404;
      throw error;
    }
    //check user has disliked this comment.If user has disliked, remove this dislike, otherwise add dislike to this comment
    // check user has liked this comment. If user has liked, remove liked;
    comment.likes.pull(req.user._id);
    const checkUserHasDisliked = comment.dislikes.find(
      (userId) => userId == req.user._id
    );
    if (checkUserHasDisliked) {
      comment.dislikes.pull(req.user._id);
      await comment.save();
      return res.status(200).json({ msg: "undislike success" });
    }
    comment.dislikes.push(req.user._id);
    await comment.save();
    res.status(200).json({ msg: "dislike success" });
  } catch (error) {
    next(error);
  }
};

exports.postResponseComment = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { text } = req.body;
    const { commentId } = req.params;
    if (!text || !commentId) {
      const error = new Error("response error");
      error.statusCode = 400;
      throw error;
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error("Comment not found");
      error.statusCode = 404;
      throw error;
    }
    const newResponse = new Response({
      comment: comment._id,
      user: req.user._id,
      text,
    });

    comment.responses.push(newResponse._id);

    await comment.save();
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    next(error);
  }
};
exports.postLikeOrUnlikeResponseComment = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { responseId } = req.params;
    if (!responseId) {
      const error = new Error("request error");
      throw error;
    }
    const response = await Response.findById(responseId);
    if (!response) {
      const error = new Error("Comment not found");
      error.statusCode = 404;
      throw error;
    }
    //check user has liked this comment.If user has liked, remove this like, otherwise add like to this comment
    // check user has disliked this comment. If user has disliked, remove disliked;
    response.dislikes.pull(req.user._id);
    const checkUserHasLiked = response.likes.find(
      (userId) => userId == req.user._id
    );
    if (checkUserHasLiked) {
      response.likes.pull(req.user._id);
      await response.save();
      return res.status(200).json({ msg: "unlike success" });
    }
    response.likes.push(req.user._id);
    await response.save();
    res.status(200).json({ msg: "like success" });
  } catch (error) {
    next(error);
  }
};
exports.postDislikeOrUndislikeResponseComment = async (req, res, next) => {
  try {
    console.time("dislike or undislike response comment");
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { responseId } = req.params;
    if (!responseId) {
      const error = new Error("request error");
      throw error;
    }
    const response = await Response.findById(responseId);
    if (!response) {
      const error = new Error("response not found");
      error.statusCode = 404;
      throw error;
    }
    //check user has disliked this comment.If user has disliked, remove this dislike, otherwise add dislike to this comment
    // check user has liked this comment. If user has liked, remove liked;
    response.likes.pull(req.user._id);
    const checkUserHasDisliked = response.dislikes.find(
      (userId) => userId == req.user._id
    );
    if (checkUserHasDisliked) {
      response.dislikes.pull(req.user._id);
      await response.save();
      return res.status(200).json({ msg: "undislike success" });
    }
    response.dislikes.push(req.user._id);
    console.time("dislike or undislike response comment");
    await response.save();
    res.status(200).json({ msg: "dislike success" });
  } catch (error) {
    next(error);
  }
};
exports.postReponseToResponsecomment = async (req, res, next) => {
  try {
    if (!req.isAuthenticated || !req.user) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }
    const { text } = req.body;
    const { commentId } = req.params;

    if (!text || !commentId) {
      const error = new Error("response error");
      error.statusCode = 400;
      throw error;
    }
    const comment = await Comment.findById(commentId);
    if (!comment) {
      const error = new Error("Comment not found");
      error.statusCode = 404;
      throw error;
    }
    const newResponse = new Response({
      comment: comment._id,
      user: req.user._id,
      text,
    });

    comment.responses.push(newResponse._id);

    await comment.save();
    await newResponse.save();
    const __newResponse = await newResponse
      .populate({
        path: "user",
        select: "_id avatar google.name facebook.name local.name",
      })
      .execPopulate();
    res.status(201).json(__newResponse);
  } catch (error) {
    next(error);
  }
};
exports.getReadmoreResponsesComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const skip = +req.query.skip;
    if (!commentId || !skip) {
      const error = new Error("responses not found");
      error.statusCode = 404;
      throw error;
    }
    const responses = await Response.find({ comment: commentId })
      .populate({
        path: "user",
        select: "_id avatar facebook google local",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(+process.env.COMMENT_AND_RESPONSE_COMMENT_LIMIT);
    res.status(200).json(responses);
  } catch (error) {
    next(error);
  }
};
exports.readMoreComments = async (req, res, next) => {
  try {
    console.time("read-more-comments");
    const { productId } = req.params;
    const skip = +req.query.skip;
    const product = await Product.findById(productId).populate({
      path: "user",
      select: "_id avatar facebook.name google.name local.name",
    });
    if (!productId || !skip) {
      const error = new Error("comments not found");
      error.statusCode = 404;
      throw error;
    }
    const comments = await Comment.find({ product: productId })
      .populate({
        path: "user",
        select: "_id avatar facebook.name google.name local.name",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(+process.env.COMMENT_AND_RESPONSE_COMMENT_LIMIT);
    let commentList = {
      comments: [],
    };
    const userCreateProduct = await product.user;
    let responseList = [];
    for await (let comment of comments) {
      let __comment = comment._doc;
      let responses = await Response.find({ comment: comment._id })
        .populate({
          path: "user",
          select: "_id avatar google.name facebook.name local.name",
        })
        .sort({ createdAt: -1 })
        .limit(+process.env.COMMENT_AND_RESPONSE_COMMENT_LIMIT);
      let countCommentResponses = await Response.countDocuments({
        comment: comment._id,
      });
      responseList = [...responseList, ...responses];
      if (__comment.responses.length == comment.responses.length) {
        __comment.responses = [];
      }
      __comment.responses.push(responses.map((response) => response._id));
      __comment.countCommentResponses = countCommentResponses;
      __comment.user = {
        name:
          __comment.user.facebook.name ||
          __comment.user.google.name ||
          __comment.user.local.name,
        avatar: __comment.user.avatar,
        _id: __comment.user._id,
      };

      if (userCreateProduct == __comment.user._id) {
        commentList.comments.unshift(__comment);
      } else {
        commentList.comments.push(__comment);
      }
    }
    console.timeEnd("start-get-comment-review");
    res.status(200).json({
      comments: commentList.comments,
      responses: responseList,
    });
  } catch (error) {
    next(error);
  }
};
