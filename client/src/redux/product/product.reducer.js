import productActionTypes from "./product.types";

const INITIAL_STATE = {
  productList: [],
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionTypes.FETCH_PRODUCT_LIST_START:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    case productActionTypes.FETCH_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: action.payload,
        loading: false,
      };
    case productActionTypes.FETCH_PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
