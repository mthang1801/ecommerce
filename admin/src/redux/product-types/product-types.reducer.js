import productTypesActionTypes from "./product-types.types";

const INITIAL_STATE = {
  productTypesList: [],
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypesActionTypes.FETCH_PRODUCT_TYPES_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case productTypesActionTypes.FETCH_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        productTypesList: action.payload,
      };
    case productTypesActionTypes.FETCH_PRODUCT_TYPES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
