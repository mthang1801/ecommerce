"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewProduct = exports.registerAsSeller = exports.getListProductType = exports.getListCategory = exports.getListWards = exports.getListDistricts = exports.getListCities = exports.getProductsByProductType = exports.getCartItems = exports.getProductsPerpage = exports.getNumberOfProducts = exports.getSaleOffProducts = exports.getMaxPrice = exports.getCategoryData = exports.getProductsListByCategoryId = exports.getProductsTopRated = exports.getProductsBestSeller = exports.getLatestProducts = void 0;

var _category = _interopRequireDefault(require("../data/category"));

var _products = _interopRequireDefault(require("../data/products"));

var _sellers = _interopRequireDefault(require("../data/sellers"));

var _cart = _interopRequireDefault(require("../data/cart"));

var _axios = _interopRequireDefault(require("axios"));

var _urls = _interopRequireDefault(require("./urls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getLatestProducts = function getLatestProducts() {
  var sellers = _toConsumableArray(_sellers["default"]);

  sellers.sort(function (a, b) {
    if (Date.parse(a.createdAt) > Date.parse(b.createdAt)) return -1;
  });
  var checkProductIsTheSame = {};
  var j = 0;
  var len = 6;
  var result = [];

  if (sellers.length <= 6) {
    return sellers;
  }

  for (var i = 0; i < len; i++) {
    if (checkProductIsTheSame[sellers[i].productId]) {
      sellers[i] = sellers[len + j];
      j++;
      i--;
    } else {
      checkProductIsTheSame[sellers[i].productId] = true;
      result.push(sellers[i]);
    }
  }

  return result;
};

exports.getLatestProducts = getLatestProducts;

var getProductsBestSeller = function getProductsBestSeller() {
  var sellers = _toConsumableArray(_sellers["default"]);

  sellers = sellers.filter(function (seller) {
    return Math.ceil((Date.now() - Date.parse(seller.createdAt)) / 84600000) < 14 && seller.votes > 4;
  }).sort(function (a, b) {
    return b.sold - a.sold;
  });
  return sellers.slice(0, 6);
};

exports.getProductsBestSeller = getProductsBestSeller;

var getProductsTopRated = function getProductsTopRated() {
  var sellers = _toConsumableArray(_sellers["default"]);

  sellers.sort(function (a, b) {
    if (a.votes > b.votes) return -1;
  });
  return sellers.slice(0, 9);
};

exports.getProductsTopRated = getProductsTopRated;

var getProductsListByCategoryId = function getProductsListByCategoryId(categeryId) {
  var categories = _objectSpread({}, _category["default"]);

  var listProductsId = categories[categeryId].products;

  var products = _objectSpread({}, _products["default"]);

  var productsList = {};
  listProductsId.length && listProductsId.forEach(function (productId) {
    productsList[productId] = products[productId];
  });
  return productsList;
};

exports.getProductsListByCategoryId = getProductsListByCategoryId;

var getCategoryData = function getCategoryData() {
  var categoryList = _objectSpread({}, _category["default"]);

  return Object.keys(categoryList).map(function (key) {
    return categoryList[key];
  });
};

exports.getCategoryData = getCategoryData;

var getMaxPrice = function getMaxPrice() {
  var sellers = _toConsumableArray(_sellers["default"]);

  var max = sellers[0].price;
  sellers.forEach(function (seller) {
    if (seller.price > max) {
      max = seller.price;
    }
  });
  return max;
};

exports.getMaxPrice = getMaxPrice;

var getSaleOffProducts = function getSaleOffProducts() {
  var sellers = _toConsumableArray(_sellers["default"]);

  sellers = sellers.filter(function (seller) {
    return seller.discount > 0;
  });
  sellers.sort(function (a, b) {
    if (a.discount > b.discount) {
      return -1;
    }

    return 1;
  });
  return sellers;
};

exports.getSaleOffProducts = getSaleOffProducts;

var getNumberOfProducts = function getNumberOfProducts() {
  var sellers = _toConsumableArray(_sellers["default"]);

  return sellers.length;
};

exports.getNumberOfProducts = getNumberOfProducts;

var getProductsPerpage = function getProductsPerpage() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var viewport = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "desktop";
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "ascending";
  var NUM_PRODUCTS_PER_PAGE;

  switch (viewport) {
    case "mobileView":
      NUM_PRODUCTS_PER_PAGE = 3;
      break;

    case "tabletView":
      NUM_PRODUCTS_PER_PAGE = 6;
      break;

    default:
      NUM_PRODUCTS_PER_PAGE = 12;
  }

  var sellers = _toConsumableArray(_sellers["default"]);

  return sellers.filter(function (_, idx) {
    return idx >= (page - 1) * NUM_PRODUCTS_PER_PAGE && idx < page * NUM_PRODUCTS_PER_PAGE;
  });
};

exports.getProductsPerpage = getProductsPerpage;

var getCartItems = function getCartItems() {
  return _toConsumableArray(_cart["default"]);
}; // export const getCategoryList = () => {
//   return Object.keys(CATEGORIES_DATA).map((key) => CATEGORIES_DATA[key]);
// };


exports.getCartItems = getCartItems;

var getProductsByProductType = function getProductsByProductType(productType) {
  return _products["default"][productType];
}; //========================================


exports.getProductsByProductType = getProductsByProductType;

var getListCities = function getListCities() {
  return new Promise(function _callee(resolve, reject) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get(_urls["default"].LIST_CITIES_API));

          case 3:
            _ref = _context.sent;
            data = _ref.data;
            resolve(data);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

exports.getListCities = getListCities;

var getListDistricts = function getListDistricts(cityID) {
  return new Promise(function _callee2(resolve, reject) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get(_urls["default"].LIST_DISTRICTS_BASE_ON_CITY_ID_API(cityID)));

          case 3:
            _ref2 = _context2.sent;
            data = _ref2.data;
            resolve(data);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

exports.getListDistricts = getListDistricts;

var getListWards = function getListWards(districtID) {
  return new Promise(function _callee3(resolve, reject) {
    var _ref3, data;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get(_urls["default"].LIST_WARDS_BASE_ON_DISRICT_ID_API(districtID)));

          case 3:
            _ref3 = _context3.sent;
            data = _ref3.data;
            resolve(data);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

exports.getListWards = getListWards;

var getListCategory = function getListCategory() {
  return new Promise(function _callee4(resolve, reject) {
    var _ref4, data;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get(_urls["default"].GET_LIST_CATEGORY));

          case 3:
            _ref4 = _context4.sent;
            data = _ref4.data;
            resolve(data);
            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

exports.getListCategory = getListCategory;

var getListProductType = function getListProductType(categoryID) {
  return new Promise(function _callee5(resolve, reject) {
    var _ref5, data;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].get(_urls["default"].GET_LIST_PRODUCT_TYPE__BY_CATEGORYID(categoryID)));

          case 3:
            _ref5 = _context5.sent;
            data = _ref5.data;
            resolve(data);
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

exports.getListProductType = getListProductType;

var registerAsSeller = function registerAsSeller(registerForm) {
  return new Promise(function _callee6(resolve, reject) {
    var _ref6, data;

    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].put(_urls["default"].UPDATE_ROLE_USER_AS_SELLER, registerForm));

          case 3:
            _ref6 = _context6.sent;
            data = _ref6.data;
            resolve(true);
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 8]]);
  });
};

exports.registerAsSeller = registerAsSeller;

var createNewProduct = function createNewProduct(product) {
  return new Promise(function _callee7(resolve, reject) {
    var formData, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, file, _ref7, data;

    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            formData = new FormData();
            formData.append("categoryId", product.selectedCategory._id);
            formData.append("productTypeId", product.selectedProductType._id);
            formData.append("rootUrl", product.selectedProductType.linkUrl);
            formData.append("name", product.name);
            formData.append("tags", product.tags);
            formData.append("price", product.price);
            formData.append("discount", product.discount || 0);
            formData.append("discountExpDate", product.discountExpDate);
            formData.append("description", product.description);
            formData.append("information", product.information);
            formData.append("manufactor", product.manufactor);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context7.prev = 16;

            for (_iterator = product.image[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              file = _step.value;
              formData.append("multiple-images", file);
            }

            _context7.next = 24;
            break;

          case 20:
            _context7.prev = 20;
            _context7.t0 = _context7["catch"](16);
            _didIteratorError = true;
            _iteratorError = _context7.t0;

          case 24:
            _context7.prev = 24;
            _context7.prev = 25;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 27:
            _context7.prev = 27;

            if (!_didIteratorError) {
              _context7.next = 30;
              break;
            }

            throw _iteratorError;

          case 30:
            return _context7.finish(27);

          case 31:
            return _context7.finish(24);

          case 32:
            _context7.next = 34;
            return regeneratorRuntime.awrap(_axios["default"].post(_urls["default"].POST_CREATE_NEW_PRODUCT, formData));

          case 34:
            _ref7 = _context7.sent;
            data = _ref7.data;
            resolve(true);
            _context7.next = 42;
            break;

          case 39:
            _context7.prev = 39;
            _context7.t1 = _context7["catch"](0);
            reject(_context7.t1);

          case 42:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 39], [16, 20, 24, 32], [25,, 27, 31]]);
  });
};

exports.createNewProduct = createNewProduct;