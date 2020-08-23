"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _seller = _interopRequireDefault(require("./seller.types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  register: {
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    disabledEmail: true,
    selectedCity: {
      ID: "",
      SolrID: "",
      Title: ""
    },
    selectedDist: {
      ID: "",
      SolrID: "",
      Title: ""
    },
    selectedWard: {
      ID: "",
      SolrID: "",
      Title: ""
    }
  },
  product: {
    selectedCategory: {
      _id: "",
      name: "",
      linkUrl: ""
    },
    selectedProductType: {
      _id: "",
      name: "",
      linkUrl: ""
    },
    name: "",
    manufactor: "",
    image: [],
    tags: [],
    price: "",
    isDiscount: false,
    discount: null,
    discountExpDate: null,
    description: "",
    information: ""
  }
};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _seller["default"].SAVE_REGISTER_FORM:
      return _objectSpread({}, state, {
        register: _objectSpread({}, state.register, {}, action.payload)
      });

    case _seller["default"].SAVE_PRODUCT_FORM:
      return _objectSpread({}, state, {
        product: _objectSpread({}, state.product, {}, action.payload)
      });

    case _seller["default"].CLEAR_ALL:
      return _objectSpread({}, INITIAL_STATE);

    default:
      return state;
  }
};

exports["default"] = _default;