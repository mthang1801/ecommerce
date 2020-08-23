import sellerActionTypes from "./seller.types";

const INITIAL_STATE = {
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
      Title: "",
    },
    selectedDist: {
      ID: "",
      SolrID: "",
      Title: "",
    },
    selectedWard: {
      ID: "",
      SolrID: "",
      Title: "",
    },
  },
  product: {
    selectedCategory: {
      _id: "",
      name: "",
      linkUrl: "",
    },
    selectedProductType: {
      _id: "",
      name: "",
      linkUrl: "",
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
    information: "",
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case sellerActionTypes.SAVE_REGISTER_FORM:
      return {
        ...state,
        register: {
          ...state.register,
          ...action.payload,
        },
      };
    case sellerActionTypes.SAVE_PRODUCT_FORM:
      return {
        ...state,
        product: {
          ...state.product,
          ...action.payload,
        },
      };
    case sellerActionTypes.CLEAR_ALL:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
