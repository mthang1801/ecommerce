const Portfolio = require("../models/portfolio")
const Category = require("../models/category");
const ProductTypes = require("../models/product-types");
const Product = require("../models/product");
const User = require("../models/user");
const ProductGroup = require("../models/product-groups");
const Image = require("../models/images");
const fs = require("fs-extra");
const removeImage = require("../utils/removeImage");
const _ = require("lodash");
const Manufactor = require("../models/manufactor");
const { v4: uuid } = require("uuid");
const Ordered = require("../models/ordered");
const path = require("path");

 
exports.postPortfolio = async (req, res, next) => {
  try {
    const {name, slug} = req.body; 
    const file = req.files[0];

    const checkSlugExisted = await Portfolio.findOne({slug});
    if(checkSlugExisted){
      await removeImage(file.filename);
      const err = new Error("Portfolio has been existed") ; 
      err.statusCode = 400 ; 
      throw err ;
    }
    const fileData = await fs.readFile(file.path);
    console.log(file)
    const newPortfolio = new Portfolio({
      name, 
      slug, 
      image : {
        data : fileData , 
        mimetype : file.mimetype,
        filename : file.filename
      }
    })
    await newPortfolio.save();
    await removeImage(file.filename);
    return res.status(200).json({...newPortfolio._doc})
  } catch (error) {
    next(error);
  }
}

exports.postCategory = async (req, res, next) => {
  try {    
    let { name, linkUrl } = req.body;
    if (linkUrl[0] !== "/") {
      linkUrl = "/" + encodeURIComponent(linkUrl);
    } else {
      linkUrl = encodeURIComponent(linkUrl);
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
    console.log(req.files);
    const data = await fs.readFile(req.files[0].path, "base64");
    const newImage = new Image({
      name: req.files[0].originalname,
      mimetype: req.files[0].mimetype,
      data,
    });
    const newCategory = new Category({
      name,
      linkUrl,
      imageUrl: newImage._id,
    });
    newImage.category = newCategory._id;
    await newImage.save();
    await newCategory.save();
    await removeImage(req.files[0].filename);
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

    if (req.files[0]) {
      console.log(req.files[0]);
      const image = await Image.findOne({ category: _id });
      const data = await fs.readFile(req.files[0].path, "base64");
      if (!image) {
        const newImage = new Image({
          name: req.files[0].originalname,
          mimetype: req.files[0].mimetype,
          data,
          category: _id,
        });
        await newImage.save();
        category.imageUrl = newImage._id;
      }
      image.data = data;
      image.name = req.files[0].originalname;
      image.mimetype = req.files[0].mimetype;

      await image.save();
      await removeImage(req.files[0].filename);
    }
    category.name = name;
    category.linkUrl = linkUrl;
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
exports.getMenu = async (req, res, next) => {
  try {
    let menu = {};
    const category = await Category.find().populate("productTypes");
    for await (let categoryItem of category) {
      menu[categoryItem._id] = {
        _id: categoryItem._id,
        name: categoryItem.name,
        // linkUrl: categoryItem.linkUrl,
        linkUrl : `/category/${categoryItem._id}`
      };
      let productTypes = [];
      let count = 0;
      for await (let productTypeItem of categoryItem.productTypes) {
        let productType = {
          _id: uuid(),
          name: productTypeItem.name,
          // linkUrl: productTypeItem.linkUrl,
          linkUrl : `/product-type/${productTypeItem._id}`,
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
              _id: `${group._id}-${uuid()}`,
              name: group.name,
              // linkUrl: group.linkUrl,
              linkUrl : `/product-group/${group._id}`,
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
              options: { sort: { createdAt: -1 } },
            })
            .execPopulate();
          for await (let product of productTypeItem.products) {
            productType.productsMenu.push({
              _id: `${product._id}-${uuid()}`,
              name: product.name,
              // linkUrl: product.linkUrl,
              linkUrl : `/product/${product._id}`
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
            linkUrl: `/manufactors${categoryItem.linkUrl}`,
            productsMenu: [],
          };
          let trackManufactorList = {};
          let limit = 5;
          for (let productType of categoryItem.productTypes) {
            let productTypeList = await productType
              .populate("manufactors")
              .execPopulate();
            let manufactorsList = productTypeList.manufactors;
            for (let manufactor of manufactorsList) {
              if (limit >= 0) {
                if (!trackManufactorList[manufactor._id]) {
                  manufactorOfProductType.productsMenu.push({
                    _id: manufactor._id,
                    name: manufactor.name,
                    linkUrl: manufactor.linkUrl,
                  });
                  trackManufactorList[manufactor._id] = true;
                  limit--;
                }
              } else {
                manufactorOfProductType.productsMenu.push({
                  _id: uuid(),
                  name: "Xem thêm...",
                  linkUrl: `${categoryItem.linkUrl}/more`,
                });
                break;
              }
            }
            if (limit < 0) {
              break;
            }
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
    let { data } = req.body;
    console.log(data);

    await fs.writeFile(
      path.join(
        path.dirname(require.main.filename),
        "client",
        "src",
        "data",
        "menu.json"
      ),
      data,
      "utf8"
    );
    res.status(201).json({ msg: "created success" });
  } catch (error) {
    next(error);
  }
};

exports.updateManufactor = async (req, res, next) => {
  try {
    console.time("start");
    const orderedList = await Ordered.find();
    for await (let orderedItem of orderedList) {
      if (orderedItem.time_expire.getTime() < Date.now()) {
        orderedItem.status = "completed";
        await orderedItem.save();
      }
    }
    console.timeEnd("start");
  } catch (error) {
    next(error);
  }
};

exports.getProductList = async (req, res, next) => {
  try {
    console.time("start-get-admin-product-list");
    const productList = await Product.find({
      linkUrl: new RegExp("^%2F", "i"),
    });
    console.timeEnd("start-get-admin-product-list");
    res.status(200).json(productList);
  } catch (error) {
    next(error);
  }
};
exports.updateProductList = async (req, res, next) => {
  try {
    console.time("update-product-list");

    const { productList } = req.body;
    console.log(productList);
    for await (let product of productList) {
      let __product = await Product.findById(product._id);
      __product.linkUrl = product.linkUrl;
      console.log(__product.linkUrl);
      await __product.save();
    }
    console.timeEnd("update-product-list");
  } catch (error) {
    next(error);
  }
};

exports.updateFileImages = async (req, res, next) => {
  try {
    console.time("updateFileImages");
    const products = await Product.find();
    const categories = await Category.find();
    const images = await Image.find();
    let listRemoved = [];
    let count = 0;
    for await (let image of images) {
      let product = await Product.findOne({ images: image._id });
      if (!product) {
        let category = await Category.findOne({ imageUrl: image._id });
        if (!category) {
          await Image.findByIdAndDelete(image._id);
        }
      }
    }
    console.log(count);
    console.timeEnd("updateFileImages");
  } catch (error) {
    next(error);
  }
};
