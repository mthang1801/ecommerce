import productTypeActionTypes from "./product-type.types";

const INITIAL_STATE = {
  productTypeList: [],
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypeActionTypes.FETCH_PRODUCT_TYPE_LIST_START:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    case productTypeActionTypes.FETCH_PRODUCT_TYPE_LIST_SUCCESS:
      return {
        ...state,
        productTypeList: action.payload,
        loading: false,
      };
    case productTypeActionTypes.FETCH_PRODUCT_TYPE_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
