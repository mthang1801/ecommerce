const Category = require("../models/category");
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
    console.log(req.body, req.file);
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
    console.log(filename);
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
    const category = await Category.findByIdAndDelete(categoryId);
    await removeImage(category.imageUrl);
    res.status(200).json({ message: "Delete success!!" });
  } catch (error) {}
};
