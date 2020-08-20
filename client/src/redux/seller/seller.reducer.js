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
  term: false,
  product: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case sellerActionTypes.SAVE_REGISTER_FORM:
      return {
        ...state,
        register: {
          ...state.register,
          [action.payload.key]: { ...action.payload.value },
        },
      };
    case sellerActionTypes.SAVE_TERM:
      return {
        ...state,
        term: action.payload,
      };
    case sellerActionTypes.SAVE_PRODUCT_FORM:
    case sellerActionTypes.CLEAR_ALL:
      return {
        register: {},
        term: false,
        product: {},
      };
    default:
      return state;
  }
};
