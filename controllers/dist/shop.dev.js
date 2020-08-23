"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Category = require("../models/category");

var ProductTypes = require("../models/product-types");

var Image = require("../models/images");

var Product = require("../models/product");

var User = require("../models/user");

var fs = require("fs-extra");

var _require = require("ejs"),
    openDelimiter = _require.openDelimiter;

exports.getCategoryList = function _callee(req, res, next) {
  var searchKey, categoryFilter, categoryList;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          searchKey = req.query.search || "";

          if (!searchKey) {
            _context.next = 7;
            break;
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(Category.find({
            $and: [{
              $or: [{
                name: {
                  $regex: new RegExp(searchKey, "i")
                }
              }, {
                linkUrl: {
                  $regex: new RegExp(searchKey, "i")
                }
              }]
            }, {
              status: "active"
            }]
          }));

        case 5:
          categoryFilter = _context.sent;
          return _context.abrupt("return", res.status(200).json(categoryFilter));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(Category.find());

        case 9:
          categoryList = _context.sent;
          res.status(200).json(categoryList);
          _context.next = 16;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
};

exports.getListProductTypesByCategoryId = function _callee2(req, res, next) {
  var id, data;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          id = req.params.id;
          _context2.next = 4;
          return regeneratorRuntime.awrap(ProductTypes.find({
            category: id,
            status: "active"
          }));

        case 4:
          data = _context2.sent;
          res.status(200).json(data);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getProductTypes = function _callee3(req, res, next) {
  var searchKey, categoryFilter, page, numberProductTypesPerPage, numberProductTypes, productTypesList;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          searchKey = req.query.search || "";

          if (!searchKey) {
            _context3.next = 7;
            break;
          }

          _context3.next = 5;
          return regeneratorRuntime.awrap(ProductTypes.find({
            $and: [{
              $or: [{
                name: {
                  $regex: new RegExp(searchKey, "i")
                }
              }, {
                linkUrl: {
                  $regex: new RegExp(searchKey, "i")
                }
              }]
            }, {
              status: "active"
            }]
          }));

        case 5:
          categoryFilter = _context3.sent;
          return _context3.abrupt("return", res.status(200).json(categoryFilter));

        case 7:
          page = +req.query.page || 1;
          numberProductTypesPerPage = +req.query.number || 5;
          _context3.next = 11;
          return regeneratorRuntime.awrap(ProductTypes.countDocuments());

        case 11:
          numberProductTypes = _context3.sent;

          if (!(numberProductTypesPerPage > numberProductTypes)) {
            _context3.next = 18;
            break;
          }

          _context3.next = 15;
          return regeneratorRuntime.awrap(ProductTypes.find());

        case 15:
          productTypesList = _context3.sent;
          _context3.next = 21;
          break;

        case 18:
          _context3.next = 20;
          return regeneratorRuntime.awrap(ProductTypes.find().skip((page - 1) * numberProductTypesPerPage).limit(numberProductTypesPerPage));

        case 20:
          productTypesList = _context3.sent;

        case 21:
          res.status(200).json({
            productTypesList: productTypesList,
            count: numberProductTypes
          });
          _context3.next = 27;
          break;

        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](0);
          next(_context3.t0);

        case 27:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 24]]);
};

exports.getProductTypesById = function _callee4(req, res, next) {
  var id, productTypes;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          _context4.next = 4;
          return regeneratorRuntime.awrap(ProductTypes.findOne({
            _id: id,
            status: "active"
          }).populate("category"));

        case 4:
          productTypes = _context4.sent;
          res.status(200).json(productTypes);
          _context4.next = 11;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          next(_context4.t0);

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getListLinksProductTypes = function _callee6(req, res, next) {
  var id, category, err, productTypes, productTypesPromise, listLinkUrl;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.query.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(Category.findOne({
            _id: id,
            status: "active"
          }));

        case 4:
          category = _context6.sent;

          if (category) {
            _context6.next = 9;
            break;
          }

          err = new Error("Category not found");
          err.statusCode = 404;
          throw err;

        case 9:
          productTypes = category.productTypes;
          productTypesPromise = productTypes.map(function _callee5(_id) {
            var productType;
            return regeneratorRuntime.async(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return regeneratorRuntime.awrap(ProductTypes.findById(_id));

                  case 2:
                    productType = _context5.sent;
                    return _context5.abrupt("return", {
                      _id: productType._id,
                      linkUrl: productType.linkUrl,
                      name: productType.name
                    });

                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }
            });
          });
          _context6.next = 13;
          return regeneratorRuntime.awrap(Promise.all(productTypesPromise));

        case 13:
          listLinkUrl = _context6.sent;
          res.status(200).json(listLinkUrl);
          _context6.next = 20;
          break;

        case 17:
          _context6.prev = 17;
          _context6.t0 = _context6["catch"](0);
          next(_context6.t0);

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 17]]);
};

exports.postCreateProduct = function _callee10(req, res, next) {
  var error, _req$body, categoryId, productTypeId, rootUrl, name, tags, price, discount, discountExpDate, description, information, manufactor, match, nameUrl, newProduct, user, productType, _error, _error2, listBase64ImagePromise, listBase64Image, listImagesPromise, listImages;

  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;

          if (!(!req.isAuthenticated || !req.user)) {
            _context10.next = 5;
            break;
          }

          error = new Error("Unauthorized");
          error.statusCode = 401;
          throw error;

        case 5:
          _req$body = req.body, categoryId = _req$body.categoryId, productTypeId = _req$body.productTypeId, rootUrl = _req$body.rootUrl, name = _req$body.name, tags = _req$body.tags, price = _req$body.price, discount = _req$body.discount, discountExpDate = _req$body.discountExpDate, description = _req$body.description, information = _req$body.information, manufactor = _req$body.manufactor; //set name url for product

          match = /[A-Za-z0-9]/;
          nameUrl = name.split(" ").filter(function (character) {
            return match.test(character);
          }).concat([Date.now()]).join("-").toLowerCase();
          newProduct = new Product({
            name: name,
            tags: tags,
            linkUrl: "".concat(rootUrl, "/").concat(nameUrl),
            price: price,
            description: description,
            information: information,
            user: req.user._id,
            productType: productTypeId,
            category: categoryId,
            manufactor: manufactor
          });

          if (+discount > 0 && discountExpDate) {
            newProduct.discount = {
              value: +discount,
              start_at: new Date(),
              end_at: discountExpDate
            };
          }

          _context10.next = 12;
          return regeneratorRuntime.awrap(User.findById(req.user._id));

        case 12:
          user = _context10.sent;
          _context10.next = 15;
          return regeneratorRuntime.awrap(ProductTypes.findOne({
            _id: productTypeId,
            status: "active"
          }));

        case 15:
          productType = _context10.sent;

          if (user) {
            _context10.next = 20;
            break;
          }

          _error = new Error("User has not existed");
          _error.statusCode = 404;
          throw _error;

        case 20:
          if (productType) {
            _context10.next = 24;
            break;
          }

          _error2 = new Error("Category has not existed");
          _error2.statusCode = 404;
          throw _error2;

        case 24:
          _context10.next = 26;
          return regeneratorRuntime.awrap(newProduct.save());

        case 26:
          user.products.push(newProduct);
          productType.products.push(newProduct);
          _context10.next = 30;
          return regeneratorRuntime.awrap(user.save());

        case 30:
          _context10.next = 32;
          return regeneratorRuntime.awrap(productType.save());

        case 32:
          //generate base 64image to save in db
          listBase64ImagePromise = req.files.map(function _callee7(file) {
            var data, mimetype, name;
            return regeneratorRuntime.async(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return regeneratorRuntime.awrap(fs.readFile(file.path, "base64"));

                  case 2:
                    data = _context7.sent;
                    mimetype = file.mimetype;
                    name = file.originalname;
                    return _context7.abrupt("return", {
                      data: data,
                      mimetype: mimetype,
                      name: name
                    });

                  case 6:
                  case "end":
                    return _context7.stop();
                }
              }
            });
          });
          _context10.next = 35;
          return regeneratorRuntime.awrap(Promise.all(listBase64ImagePromise));

        case 35:
          listBase64Image = _context10.sent;
          listImagesPromise = listBase64Image.map(function _callee8(_ref) {
            var name, data, mimetype, newImage;
            return regeneratorRuntime.async(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    name = _ref.name, data = _ref.data, mimetype = _ref.mimetype;
                    newImage = new Image({
                      name: name,
                      data: data,
                      mimetype: mimetype,
                      product: newProduct
                    });
                    _context8.next = 4;
                    return regeneratorRuntime.awrap(newImage.save());

                  case 4:
                    return _context8.abrupt("return", newImage._id);

                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }
            });
          });
          _context10.next = 39;
          return regeneratorRuntime.awrap(Promise.all(listImagesPromise));

        case 39:
          listImages = _context10.sent;
          newProduct.images = _toConsumableArray(listImages);
          _context10.next = 43;
          return regeneratorRuntime.awrap(newProduct.save());

        case 43:
          req.files.forEach(function _callee9(file) {
            return regeneratorRuntime.async(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return regeneratorRuntime.awrap(fs.unlink(file.path));

                  case 2:
                  case "end":
                    return _context9.stop();
                }
              }
            });
          });
          res.status(200).json({
            msg: "product created"
          });
          _context10.next = 50;
          break;

        case 47:
          _context10.prev = 47;
          _context10.t0 = _context10["catch"](0);
          next(_context10.t0);

        case 50:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 47]]);
};