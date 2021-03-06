const Portfolio = require("../models/portfolio");
const Manufactor = require("../models/manufactor");
const Category = require("../models/category");
const ProductGroup = require("../models/product-group");
const Product = require("../models/product");
const User = require("../models/user");
const fs = require("fs-extra");
const path = require("path")
const cloudinary = require("../config/cloudinary");
const removeVietnameseTones = require("../utils/removeVietnameseTones");
const removeImage = require("../utils/removeImage");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
exports.searchPortfolio = async (req, res, next) => {
  try {
    const { search } = req.query;
    const searchResults = await Portfolio.find({
      name: new RegExp(search, "gi"),
    });
    return res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};

exports.searchCategory = async (req, res, next) => {
  try {
    const { search } = req.query;

    const searchResults = await Category.find({
      name: new RegExp(search, "gi"),
    }).populate("portfolio");
    return res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};

exports.searchProductGroup = async (req, res, next) => {
  try {
    const { search } = req.query;

    const searchResults = await ProductGroup.find({
      name: new RegExp(search, "gi"),
    })
      .populate({ path: "portfolio", select: "name" })
      .populate({ path: "category", select: "name" });
    return res.status(200).json(searchResults);
  } catch (error) {
    next(error);
  }
};

exports.getPortfolio = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({});
    return res.status(200).json({ portfolios: portfolios });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getPortfoliosMenu = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find(
      { active: true },
      { name: 1, slug : 1}
    )
      .populate({
        path: "categories",
        populate: { path: "productGroups", select: "name slug" },
        select: "name slug",
      })
      .populate({path : "manufactors", select : "name slug"})
      .sort({ name: 1 });
    const portfoliosMenuResult = portfolios.map((portfolio) => {
      let _portfolio = portfolio._doc ;
      if (_portfolio.manufactors?.length) {
        const newCategory = {
          _id: uuidv4(),
          name: "Top thương hiệu",
          slug: "manufactors",
          productGroup: _portfolio.manufactors._doc || [],
        };
        _portfolio.categories = [..._portfolio.categories, { ...newCategory }];
      }
      delete _portfolio.manufactors;
      return {..._portfolio}
    });
    const resultData =  JSON.stringify({ lastUpdate: new Date(), data : portfoliosMenuResult})
    // await fs.writeFile(path.join())    
    let rootDirLink = path.dirname(require.main.filename)
    let rootDirName = path.basename(rootDirLink);
    let dirBase = rootDirLink.replace(rootDirName,"");
    let target = "client/src/static/portfolios-menu.json"
    await fs.writeFile(`${dirBase}${target}`,resultData )
    return res.status(200).json({data : resultData})
  } catch (error) {
    next(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    let { skip, limit } = req.query;
    skip = +skip;
    limit = +limit;

    if (!skip) {
      skip = 0;
    }
    if (!limit) {
      limit = +process.env.CATEGORY_PER_LOAD;
    }
    const categoryResult = await Category.find()
      .populate({ path: "portfolio", select: "name" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const countCategories = await Category.countDocuments();
    return res
      .status(200)
      .json({ categories: categoryResult, count: countCategories });
  } catch (error) {
    next(error);
  }
};

exports.getProductGroup = async (req, res, next) => {
  try {
    let { skip, limit } = req.query;
    skip = +skip;
    limit = +limit;

    if (!skip) {
      skip = 0;
    }
    if (!limit) {
      limit = +process.env.PRODUCT_GROUP_PER_LOAD;
    }
    const productGroupsResult = await ProductGroup.find()
      .populate({ path: "portfolio", select: "name" })
      .populate({ path: "category", select: "name" })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const countProductGroups = await ProductGroup.countDocuments();
    return res
      .status(200)
      .json({ productGroups: productGroupsResult, count: countProductGroups });
  } catch (error) {
    next(error);
  }
};

exports.getCategoriesByPortfolio = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    if (!portfolioId) {
      return;
    }
    const portfolio = await Portfolio.findById(portfolioId).populate({
      path: "categories",
      match: { active: true },
      select: "name slug",
    });
    return res.status(200).json({ categories: portfolio.categories });
  } catch (error) {
    next(error);
  }
};

exports.getManufactorsByPortfolio = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const portfolio = await Portfolio.findById(portfolioId).populate({
      path: "manufactors",
      select: "name slug",
    });
    return res.status(200).json({ manufactors: portfolio.manufactors });
  } catch (error) {
    next(error);
  }
};

exports.getProductGroupsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId).populate({
      path: "productGroups",
      match: { active: true },
      select: "name slug",
    });
    return res.status(200).json({ productGroups: category.productGroups });
  } catch (error) {
    next(error);
  }
};

exports.postProduct = async (req, res, next) => {
  try {
    const {
      portfolioId,
      categoryId,
      productGroupId,
      name,
      price,
      origin,
      discount,
      discountExpDate,
      description,
      information,
      manufactorId,
      manufactorName,
      weight,
      quantity,
      ship_fee,
    } = req.body;

    let manufactor;
    if (manufactorId !== "undefined") {
      manufactor = await Manufactor.findById(manufactorId);
    } else {
      const manufactorSlug = removeVietnameseTones(manufactorName)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-");
      const checkManufactorSlugExisted = await Manufactor.findOne({
        slug: manufactorSlug,
      });
      if (checkManufactorSlugExisted) {
        manufactor = checkManufactorSlugExisted;
      } else {
        manufactor = new Manufactor({
          name: manufactorName,
          slug: manufactorSlug,
          portfolios: [portfolioId],
        });
      }
    }

    const files = req.files;
    if (files.length > 5 || !files) {
      const err = new Error(
        "A product need to have at least an image and at most 5 images"
      );
      err.statusCode = 400;
      throw err;
    }
    let images = [];
    for (let file of files) {
      const image = await cloudinary.uploader.upload(file.path, {
        tags: "products",
        width: 500,
        height: 500,
        crop: "fit",
      });
      images.push(image.secure_url);
      await removeImage(file.filename);
    }
    if (!images.length) {
      const err = new Error("Server error");
      err.statusCode = 500;
      throw err;
    }

    let slug = removeVietnameseTones(name)
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-");
    const checkSlug = await Product.findOne({ slug });
    if (checkSlug) {
      slug = `${slug}-${Date.now().toString(32)}`;
    }

    if (discount < 0 || discount > 100) {
      const err = new Error("Discount is not valid");
      err.statusCode = 400;
      throw err;
    }

    if (Date.now() > new Date(discountExpDate).getTime()) {
      const err = new Error("Expiration Date is invalid");
      err.statusCode = 400;
      throw err;
    }

    let newProduct = new Product({
      name,
      slug,
      price,
      images,
      price,
      description,
      information,
      user: req.user._id,
      portfolio: portfolioId,
      category: categoryId,
      manufactor: manufactor._id,
      origin,
      quantity,
      ship_fee,
      weight,
    });
    if (productGroupId) {
      newProduct.productGroup = productGroupId;
    }

    if (discount) {
      newProduct.value = discount;
      newProduct.start_at = Date.now();
      newProduct.end_at = new Date(discountExpDate);
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    //save product in manufactor field
    manufactor.products.push(newProduct._id);
    if (!manufactor.portfolios.includes(portfolioId.toString())) {
      manufactor.portfolios.push(portfolioId);
    }
    await manufactor.save();
    //save product in products field of portfolio
    await Portfolio.findByIdAndUpdate(portfolioId, {
      $push: { products: newProduct._id },
      $addToSet: { manufactors: manufactor._id },
    });
    //save product in products field of category
    await Category.findByIdAndUpdate(categoryId, {
      $push: { products: newProduct._id },
    });
    //save product in products field of product-group
    if (productGroupId) {
      await ProductGroup.findByIdAndUpdate(productGroupId, {
        $push: { products: newProduct._id },
      });
    }
    //save product in user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { products: newProduct._id },
    });
    //save product
    newProduct.save();
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ product: newProduct._doc });
  } catch (error) {
    next(error);
  }
};

exports.getHome = async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find();
    const recommendedProducts = await Product.find({})
      .sort({
        "sold_quantity_by_date.quantity": -1,
        sold_quantity: -1,
        stars: -1,
      })
      .skip(0)
      .limit(+process.env.PRODUCTS_PER_PAGE);

    return res.status(200).json({ portfolios, recommendedProducts });
  } catch (error) {
    next(error);
  }
};
