const Portfolio = require("../models/portfolio");
const Category = require("../models/category");
const ProductGroup = require("../models/product-group");
const Product = require("../models/product");
const User = require("../models/user");
const Manufactor = require("../models/manufactor");
const cloudinary = require("../config/cloudinary");
const removeImage = require("../utils/removeImage");
const mongoose = require("mongoose");
const removeVietnameseTones = require("../../client/src/utils/removeVietnameseTones");

exports.postPortfolio = async (req, res, next) => {
  try {
    const { name, slug } = req.body;
    const file = req.files[0];
    if (!file) {
      const err = new Error("Image is required");
      err.statusCode = 400;
      throw err;
    }
    const image = await cloudinary.uploader.upload(file.path, {
      tags: "portfolios",
      width: 200,
      height: 200,
    });
    await removeImage(file.filename);
    const checkSlugExisted = await Portfolio.findOne({ slug });
    if (checkSlugExisted) {
      const err = new Error("Portfolio has been existed");
      err.statusCode = 400;
      throw err;
    }

    const newPortfolio = new Portfolio({
      name,
      slug,
      image: {
        url: image.secure_url,
        public_id: image.public_id,
      },
    });
    await newPortfolio.save();
    return res.status(201).json({ ...newPortfolio._doc });
  } catch (error) {
    next(error);
  }
};

exports.editPortfolio = async (req, res, next) => {
  try {
    const { _id, name, slug } = req.body;
    const portfolio = await Portfolio.findById(_id);
    let file = req.files[0];

    if (!portfolio) {
      const err = new Error("Portfolio not found");
      err.statusCode = 404;
      throw err;
    }
    if (file) {
      if (portfolio.image.public_id) {
        await cloudinary.uploader.destroy(portfolio.image.public_id);
      }
      const image = await cloudinary.uploader.upload(file.path, {
        tags: "portfolios",
        width: 200,
        height: 200,
      });
      portfolio.image.url = image.secure_url;
      portfolio.image.public_id = image.public_id;
      await removeImage(file.filename);
    }

    portfolio.name = name;
    portfolio.slug = slug;
    await portfolio.save();

    return res.status(200).json({ portfolio: portfolio._doc });
  } catch (error) {
    next(error);
  }
};

exports.removePortfolio = async (req, res, next) => {
  try {
    const { _id } = req.body;
    //use method findByIdAndDelete() to return portfolio item
    const portfolio = await Portfolio.findByIdAndDelete(_id);

    if (!portfolio) {
      const err = new Error("Removed failed");
      err.statusCode = 400;
      throw err;
    }
    //loop and remove category
    for (let categoryId of portfolio.categories) {
      const category = await Category.findByIdAndDelete(categoryId);
    }
    //loop and remove product group
    for (let productGroupId of portfolio.productGroups) {
      await ProductGroup.findByIdAndDelete(productGroupId);
    }
    //loop and remove product
    for (let productId of portfolio.products) {
      await Product.findByIdAndDelete(productId);
      //remove products in user
      await User.findOneAndUpdate(
        { products: productId },
        { $pull: { products: productId } }
      );
    }
    //loop and remove manufactor
    for (let manufactorId of portfolio.manufactors) {
      await Manufactor.findByIdAndDelete(manufactorId);
    }

    return res.status(200).json({ status: "success" });
  } catch (error) {
    next(error);
  }
};

exports.postCreateCategory = async (req, res, next) => {
  try {
    let { name, slug, portfolioId, status } = req.body;
    if (status === "true") {
      status = true;
    } else {
      status = false;
    }
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      const err = new Error("Portfolio not found");
      err.statusCode = 404;
      throw err;
    }
    const newCategoryItem = new Category({
      name,
      slug,
      active: status,
      portfolio: portfolioId,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    portfolio.categories.push(newCategoryItem._id);
    await portfolio.save();
    await (await newCategoryItem.save())
      .populate({ path: "portfolio", select: "name" })
      .execPopulate();
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ category: newCategoryItem._doc });
  } catch (error) {
    next(error);
  }
};

exports.putEditCategory = async (req, res, next) => {
  try {
    let { _id, name, slug, portfolioId, status } = req.body;
    if (status === "true") {
      status = true;
    } else {
      status = false;
    }
    const category = await Category.findById(_id);

    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      throw err;
    }
    if (slug !== category.slug) {
      const checkSlug = await Category.findOne({ slug });
      if (checkSlug) {
        const err = new Error("Slug has been existed");
        err.statusCode = 400;
        throw err;
      }
    }
    let newPortfolio;
    if (category.portfolio.toString() !== portfolioId.toString()) {
      newPortfolio = await Portfolio.findById(portfolioId);
      if (!newPortfolio) {
        const err = new Error("Portfolio not found");
        err.statusCode = 404;
        throw err;
      }
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    if (newPortfolio) {
      //update old Portfolio;
      await Portfolio.findByIdAndUpdate(
        category.portfolio,
        { $pull: { categories: category._id } },
        { new: true }
      );
      newPortfolio.categories.push(category._id);
      await newPortfolio.save();
    }
    category.name = name;
    category.slug = slug;
    category.active = status;
    category.portfolio = portfolioId;
    await (await category.save())
      .populate({ path: "portfolio", select: "name" })
      .execPopulate();
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ category: category._doc });
  } catch (error) {
    next(error);
  }
};

exports.removeCategory = async (req, res, next) => {
  try {
    const { id } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      const err = new Error("Delete failed, not found category");
      err.statusCode = 404;
      throw err;
    }
    const portfolioContainCategory = await Portfolio.findById(
      category.portfolio
    );
    const session = await mongoose.startSession();
    session.startTransaction();
    portfolioContainCategory.categories.pull(id);

    //remove product group
    for (let productGroupId of category.productGroups) {
      await ProductGroup.findByIdAndDelete(productGroupId);
    }
    //remove products
    for (let productId of category.products) {
      await Product.findByIdAndDelete(productId);
      await User.findOneAndUpdate(
        { products: productId },
        { $pull: { products: productId } }
      );
      portfolioContainCategory.products.pull(productId);
    }
    await portfolioContainCategory.save();
    await Category.findByIdAndDelete(id);
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ result: true });
  } catch (error) {
    next(error);
  }
};

exports.generateManuCategories = async (req, res, next) => {
  try {
    let {portfolioId,categoriesList } = req.body;
    categoriesList = JSON.parse(categoriesList);
    const portfolio = await Portfolio.findById(portfolioId);
    if(!portfolio){
      const err = new Error("Portfolio not found");
      err.statusCode = 404; 
      throw err; 
    }
    let categoriesResult = [];
    for(let categoriesItem of categoriesList){
      const slug =  removeVietnameseTones(categoriesItem)
      .trim()
      .replace(/[^a-zA-Z0-9]+/g, "-");  
      const checkSlugExisted = await Category.findOne({slug});
      if(checkSlugExisted){
        continue; 
      }
      const newCategoryItem = new Category({
        name : categoriesItem,
        slug, 
        portfolio : portfolioId
      })
      portfolio.categories.push(newCategoryItem._id);
      await portfolio.save();
      await (await newCategoryItem.save()).populate("portfolio");
      categoriesResult = [...categoriesResult, newCategoryItem._doc]
    }
    return res.status(201).json({categoriesList : categoriesResult})
  } catch (error) {
    next(error);
  }
}

exports.postCreateProductGroup = async (req, res, next) => {
  try {
    let { name, slug, portfolioId, categoryId, status } = req.body;
    if (status === "true") {
      status = true;
    } else {
      status = false;
    }
    const portfolio = await Portfolio.findById(portfolioId);
    const category = await Category.findById(categoryId);
    if (!portfolio || !category) {
      const err = new Error("Portfolio or category not found");
      err.statusCode = 404;
      throw err;
    }
    const newProductGroup = new ProductGroup({
      name,
      slug,
      active: status,
      portfolio: portfolioId,
      category: categoryId,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    portfolio.productGroups.push(newProductGroup._id);
    category.productGroups.push(newProductGroup._id);
    await portfolio.save();
    await category.save();
    await (await newProductGroup.save())
      .populate({ path: "portfolio", select: "name" })
      .populate({ path: "category", select: "name" })
      .execPopulate();
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ productGroup: newProductGroup._doc });
  } catch (error) {
    next(error);
  }
};

exports.editProductGroup = async (req, res, next) => {
  let { _id, name, slug, portfolioId, categoryId, status } = req.body;
  if (status === "true") {
    status = true;
  } else {
    status = false;
  }
  const productGroup = await ProductGroup.findById(_id);

  if (!productGroup) {
    const err = new Error("Category not found");
    err.statusCode = 404;
    throw err;
  }
  if (slug !== productGroup.slug) {
    const checkSlug = await ProductGroup.findOne({ slug });
    if (checkSlug) {
      const err = new Error("Slug has been existed");
      err.statusCode = 400;
      throw err;
    }
  }
  let newPortfolio;
  let newCategory;
  if (productGroup.portfolio.toString() !== portfolioId.toString()) {
    newPortfolio = await Portfolio.findById(portfolioId);
    if (!newPortfolio) {
      const err = new Error("Portfolio not found");
      err.statusCode = 404;
      throw err;
    }
  }
  if (productGroup.category.toString() !== categoryId.toString()) {
    newCategory = await Category.findById(categoryId);
    if (!newCategory) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      throw err;
    }
  }

  const session = await mongoose.startSession();
  session.startTransaction();
  if (newPortfolio) {
    //update old Portfolio;
    await Portfolio.findByIdAndUpdate(
      productGroup.portfolio,
      { $pull: { productGroups: productGroup._id } },
      { new: true }
    );
    newPortfolio.productGroups.push(productGroup._id);
    await newPortfolio.save();
  }
  if (newCategory) {
    //update old Portfolio;
    await Category.findByIdAndUpdate(
      productGroup.category,
      { $pull: { productGroups: productGroup._id } },
      { new: true }
    );
    newCategory.productGroups.push(productGroup._id);
    await newCategory.save();
  }
  productGroup.name = name;
  productGroup.slug = slug;
  productGroup.portfolio = portfolioId;
  productGroup.category = categoryId;
  productGroup.active = status;
  await (await productGroup.save())
    .populate({ path: "portfolio", select: "name" })
    .populate({ path: "category", select: "name" })
    .execPopulate();
  await session.commitTransaction();
  session.endSession();
  return res.status(200).json({ productGroup: productGroup._doc });
};

exports.removeProductGroup = async (req, res, next) => {
  try {
    const { id } = req.body;
    const productGroup = await ProductGroup.findById(id);
    if (!productGroup) {
      const err = new Error("Delete failed, not found category");
      err.statusCode = 404;
      throw err;
    }
    const portfolioContainProductGroup = await Portfolio.findById(
      productGroup.portfolio
    );
    const categoryContainProductGroup = await Category.findById(
      productGroup.category
    );
    const session = await mongoose.startSession();
    session.startTransaction();
    portfolioContainProductGroup.productGroups.pull(id);
    categoryContainProductGroup.productGroups.pull(id);
    //remove product
    for (let productId of productGroup.products) {
      await Product.findByIdAndDelete(productId);
      portfolioContainProductGroup.products.pull(productId);
      categoryContainProductGroup.products.pull(productId);
      await User.findOneAndUpdate(
        { products: productId },
        { $pull: { products: productId } }
      );
    }
    await portfolioContainProductGroup.save();
    await categoryContainProductGroup.save();
    await ProductGroup.findByIdAndDelete(id);
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ result: true });
  } catch (error) {
    next(error);
  }
};

exports.generateManuProductGroups = async (req, res, next) => {
  try {
    let { portfolioId, categoryId, productGroupsList } = req.body;
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      const err = new Error("Portfolio not found");
      err.statusCode = 404;
      throw err;
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      const err = new Error("Category not found");
      err.statusCode = 404;
      throw err;
    }
    productGroupsList = JSON.parse(productGroupsList);

    let productGroupsListResult = [];
    for (let productGroupName of productGroupsList) {
      const slug = removeVietnameseTones(productGroupName)
        .trim()
        .replace(/[^a-zA-Z0-9]+/g, "-");       
      const checkSlug = await ProductGroup.findOne({ slug });
      
      if (checkSlug) {
        continue;
      }
      const newProductGroup = new ProductGroup({
        name: productGroupName,
        slug,
        portfolio: portfolioId,
        category: categoryId,
      });
      portfolio.productGroups.push(newProductGroup._id);
      category.productGroups.push(newProductGroup._id);
      await portfolio.save();
      await category.save();
      await (await newProductGroup.save())
        .populate({ path: "portfolio", select: "name" })
        .populate({ path: "category", select: "name" })
        .execPopulate();
      productGroupsListResult = [...productGroupsListResult, newProductGroup._doc]
    }
    return res.status(201).json({productGroupsList : productGroupsListResult})
  } catch (error) {
    next(error);
  }
};
