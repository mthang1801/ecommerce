exports.postAddProducts = async (req, res, next) => {
  try {
    const { name, linkUrl, rootLink } = req.body;
    let checkProductsExisting = await Product.findOne({
      $or: [{ name: name }, { linkUrl: linkUrl }],
    });
    if (checkProductsExisting) {
      const error = new Error("Product has been existing");
      error.statusCode = 400;
      throw error;
    }
    const productType = await ProductTypes.findOne({ linkUrl: rootLink });
    const categoryType = await Category.findById(productType.category);
    const newProduct = new Product({
      name,
      linkUrl,
      category: categoryType,
      productType,
    });
    const createdProduct = await newProduct.save();
    productType.products.push(createdProduct._id);
    await productType.save();
    res.status(201).json(createdProduct._doc);
  } catch (error) {
    next(error);
  }
};

exports.putEditProduct = async (req, res, next) => {
  try {
    const { _id, name, linkUrl, rootLink, categoryLink } = req.body.product;
    const product = await Product.findById(_id)
      .populate("category")
      .populate("product-types");
    if (!product) {
      const err = new Error("Product not found");
      err.statusCode = 404;
      throw err;
    }
    if (product.linkUrl !== linkUrl) {
      let oldProductType = await ProductTypes.findById(product.productType);
      let oldCategory = await Category.findById(product.category);
      let newProductType = await ProductTypes.findOne({ linkUrl: rootLink });
      let newCategory = await Category.findOne({ linkUrl: categoryLink });
      if (!oldProductType || !oldCategory || !newProductType || !newCategory) {
        const error = new Error("Something went wrong with linkUrl");
        error.statusCode = 400;
        throw error;
      }
      if (rootLink !== product.productType.linkUrl) {
        oldProductType.products.pull(_id);
        await oldProductType.save();
        product.productType = newProductType;
        newProductType.products.push(_id);
        await newProductType.save();
        if (categoryLink !== product.category.linkUrl) {
          product.category = newCategory;
        }
      }
    }
    product.name = name;
    product.linkUrl = linkUrl;
    const editedProduct = await product.save();
    res.status(200).json(editedProduct._doc);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.query.id;
    const product = await Product.findById(id);

    if (!product) {
      const err = new Error("product not found");
      err.statusCode = 404;
      throw err;
    }

    await Product.findByIdAndDelete(id);
    const productType = await ProductTypes.findOne({ products: id });
    productType.products.pull(id);
    await productType.save();
    res.status(200).json({ msg: "remove success" });
  } catch (error) {
    next(error);
  }
};
