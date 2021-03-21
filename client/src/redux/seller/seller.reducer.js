import sellerActionTypes from "./seller.types";

const INITIAL_STATE = {
  register: {
    cardPayment : {
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      holderName : ""
    },
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
    selectedProductGroup: {
      _id: "",
      name: "",
    },
    label: "",
    groupName: "",
    name: "",
    manufactor: "",
    image: [],
    price: "",
    isDiscount: false,
    discount: null,
    discountExpDate: null,
    description: "",
    information: "",
    weight: 0,
    quantity: 0,
    ship_fee: 0,
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
