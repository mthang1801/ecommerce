import productActionTypes from "./products.types";

const INITIAL_STATE = {
  productsList: [],
  loading: false,
  error: undefined,
  count: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action) {
    case productActionTypes.FETCH_PRODUCTS_START:
    case productActionTypes.ADD_PRODUCT_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case productActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsList: [...action.payload.productsList],
        count: action.payload.count,
        loading: false,
      };
    case productActionTypes.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        productsList: [...state.productsList, action.payload],
        count: state.count + 1,
        loading: false,
      };
    case productActionTypes.FETCH_PRODUCTS_FAIL:
    case productActionTypes.ADD_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
