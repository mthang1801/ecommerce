"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Category = require("../models/category");

var ProductTypes = require("../models/product-types");

var Product = require("../models/product");

var User = require("../models/user");

var removeImage = require("../utils/removeImage");

exports.postCategory = function _callee(req, res, next) {
  var _req$body, name, linkUrl, checkCategoryExisting, error, newCategory;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, linkUrl = _req$body.linkUrl;

          if (linkUrl[0] !== "/") {
            linkUrl = "/" + linkUrl;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(Category.findOne({
            name: name,
            linkUrl: linkUrl
          }));

        case 5:
          checkCategoryExisting = _context.sent;

          if (!checkCategoryExisting) {
            _context.next = 10;
            break;
          }

          error = new Error("Category Name or linkURL has been existing");
          error.statusCode = 400;
          throw error;

        case 10:
          newCategory = new Category({
            name: name,
            linkUrl: linkUrl,
            imageUrl: req.file.filename
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(newCategory.save());

        case 13:
          res.status(201).json(_objectSpread({}, newCategory._doc));
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
};

exports.putCategory = function _callee2(req, res, next) {
  var _req$body2, _id, name, linkUrl, category, error, filename;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, _id = _req$body2._id, name = _req$body2.name, linkUrl = _req$body2.linkUrl;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Category.findById(_id));

        case 4:
          category = _context2.sent;

          if (category) {
            _context2.next = 9;
            break;
          }

          error = new Error("Category not found");
          error.statusCode = 404;
          throw error;

        case 9:
          filename = category.imageUrl;

          if (!req.file) {
            _context2.next = 14;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(removeImage(filename));

        case 13:
          filename = req.file.filename;

        case 14:
          category.name = name;
          category.linkUrl = linkUrl;
          category.imageUrl = filename;
          category.updatedAt = new Date();
          _context2.next = 20;
          return regeneratorRuntime.awrap(category.save());

        case 20:
          res.status(200).json(_objectSpread({}, category._doc));
          _context2.next = 26;
          break;

        case 23:
          _context2.prev = 23;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 26:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 23]]);
};

exports.deleteCategory = function _callee5(req, res, next) {
  var categoryId, category, err, productTypes;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          categoryId = req.body.categoryId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Category.findById(categoryId));

        case 4:
          category = _context5.sent;
          category.status = "deleted";

          if (category) {
            _context5.next = 10;
            break;
          }

          err = new Error("Category not found");
          err.statusCode = 404;
          throw err;

        case 10:
          productTypes = category.productTypes;
          _context5.next = 13;
          return regeneratorRuntime.awrap(productTypes.forEach(function _callee4(productTypeId) {
            var productType, products;
            return regeneratorRuntime.async(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return regeneratorRuntime.awrap(ProductTypes.findById(productTypeId));

                  case 2:
                    productType = _context4.sent;
                    productType.status = "deleted";
                    products = productType.products;
                    _context4.next = 7;
                    return regeneratorRuntime.awrap(products.forEach(function _callee3(productId) {
                      var product;
                      return regeneratorRuntime.async(function _callee3$(_context3) {
                        while (1) {
                          switch (_context3.prev = _context3.next) {
                            case 0:
                              _context3.prev = 0;
                              _context3.next = 3;
                              return regeneratorRuntime.awrap(Product.findById(productId));

                            case 3:
                              product = _context3.sent;
                              product.status = "deleted";
                              _context3.next = 7;
                              return regeneratorRuntime.awrap(product.save());

                            case 7:
                              _context3.next = 12;
                              break;

                            case 9:
                              _context3.prev = 9;
                              _context3.t0 = _context3["catch"](0);
                              next(_context3.t0);

                            case 12:
                            case "end":
                              return _context3.stop();
                          }
                        }
                      }, null, null, [[0, 9]]);
                    }));

                  case 7:
                    _context4.next = 9;
                    return regeneratorRuntime.awrap(productType.save());

                  case 9:
                  case "end":
                    return _context4.stop();
                }
              }
            });
          }));

        case 13:
          _context5.next = 15;
          return regeneratorRuntime.awrap(category.save());

        case 15:
          _context5.next = 17;
          return regeneratorRuntime.awrap(removeImage(category.imageUrl));

        case 17:
          res.status(200).json({
            message: "Delete success!!"
          });
          _context5.next = 22;
          break;

        case 20:
          _context5.prev = 20;
          _context5.t0 = _context5["catch"](0);

        case 22:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

exports.postAddProductTypes = function _callee6(req, res, next) {
  var _req$body3, name, linkUrl, rootLink, checkProductTypesExisting, err, category, newProductType, createdProductType;

  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _req$body3 = req.body, name = _req$body3.name, linkUrl = _req$body3.linkUrl, rootLink = _req$body3.rootLink;
          _context6.next = 4;
          return regeneratorRuntime.awrap(ProductTypes.findOne({
            $or: [{
              name: {
                $regex: new RegExp(name, "i")
              }
            }, {
              linkUrl: linkUrl
            }]
          }));

        case 4:
          checkProductTypesExisting = _context6.sent;

          if (!checkProductTypesExisting) {
            _context6.next = 9;
            break;
          }

          err = new Error("This product type has been existing!");
          err.statusCode = 400;
          throw err;

        case 9:
          _context6.next = 11;
          return regeneratorRuntime.awrap(Category.findOne({
            linkUrl: rootLink
          }));

        case 11:
          category = _context6.sent;
          newProductType = new ProductTypes({
            name: name,
            linkUrl: linkUrl,
            category: category._id
          });
          _context6.next = 15;
          return regeneratorRuntime.awrap(newProductType.save());

        case 15:
          createdProductType = _context6.sent;
          category.productTypes.push(createdProductType._id);
          _context6.next = 19;
          return regeneratorRuntime.awrap(category.save());

        case 19:
          res.status(201).json(createdProductType._doc);
          _context6.next = 25;
          break;

        case 22:
          _context6.prev = 22;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 25:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 22]]);
};

exports.putEditProductTypes = function _callee7(req, res, next) {
  var _req$body4, _id, name, linkUrl, rootUrl, productTypes, err, category, newCategory, updatedProductType;

  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _req$body4 = req.body, _id = _req$body4._id, name = _req$body4.name, linkUrl = _req$body4.linkUrl, rootUrl = _req$body4.rootUrl;
          _context7.next = 4;
          return regeneratorRuntime.awrap(ProductTypes.findById(_id));

        case 4:
          productTypes = _context7.sent;

          if (productTypes) {
            _context7.next = 9;
            break;
          }

          err = new Error("Product Types not found");
          err.statusCode = 400;
          throw err;

        case 9:
          _context7.next = 11;
          return regeneratorRuntime.awrap(Category.findOne({
            productTypes: _id
          }));

        case 11:
          category = _context7.sent;

          if (!(category && category.linkUrl !== rootUrl)) {
            _context7.next = 16;
            break;
          }

          category.productTypes.pull(_id);
          _context7.next = 16;
          return regeneratorRuntime.awrap(category.save());

        case 16:
          _context7.next = 18;
          return regeneratorRuntime.awrap(Category.findOne({
            linkUrl: rootUrl
          }));

        case 18:
          newCategory = _context7.sent;
          productTypes.name = name;
          productTypes.linkUrl = linkUrl;
          productTypes.category = newCategory._id;
          _context7.next = 24;
          return regeneratorRuntime.awrap(productTypes.save());

        case 24:
          updatedProductType = _context7.sent;
          newCategory.productTypes.push(_id);
          _context7.next = 28;
          return regeneratorRuntime.awrap(newCategory.save());

        case 28:
          res.status(200).json(updatedProductType._doc);
          _context7.next = 34;
          break;

        case 31:
          _context7.prev = 31;
          _context7.t0 = _context7["catch"](0);
          next(_context7.t0);

        case 34:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 31]]);
};

exports.deleteProductTypes = function _callee8(req, res, next) {
  var id, productType, err, category;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          id = req.body.id;
          _context8.next = 4;
          return regeneratorRuntime.awrap(ProductTypes.findById(id));

        case 4:
          productType = _context8.sent;

          if (productType) {
            _context8.next = 9;
            break;
          }

          err = new Error("Product type not found");
          err.statusCode = 404;
          throw err;

        case 9:
          _context8.next = 11;
          return regeneratorRuntime.awrap(ProductTypes.findByIdAndDelete(id));

        case 11:
          _context8.next = 13;
          return regeneratorRuntime.awrap(Category.findOne({
            productTypes: id
          }));

        case 13:
          category = _context8.sent;

          if (!category) {
            _context8.next = 18;
            break;
          }

          category.productTypes.pull(id);
          _context8.next = 18;
          return regeneratorRuntime.awrap(category.save());

        case 18:
          res.status(200).json({
            msg: "remove Success"
          });
          _context8.next = 24;
          break;

        case 21:
          _context8.prev = 21;
          _context8.t0 = _context8["catch"](0);
          next(_context8.t0);

        case 24:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 21]]);
};