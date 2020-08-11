const Category = require("../models/category");

exports.postAddProduct = async (req, res, next) => {
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
    console.log(req.file);
    const newCategory = new Category({
      name,
      linkUrl,
      imageUrl: req.file.filename,
    });
    await newCategory.save();
    res.status(201).json({ ...newCategory._doc });
  } catch (error) {
    console.log(error);
  }
};
