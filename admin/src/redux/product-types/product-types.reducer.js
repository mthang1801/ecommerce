import productTypesActionTypes from "./product-types.types";

const INITIAL_STATE = {
  productTypesList: [],
  loading: false,
  error: undefined,
  count: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productTypesActionTypes.FETCH_PRODUCT_TYPES_START:
    case productTypesActionTypes.ADD_PRODUCT_TYPE_START:
    case productTypesActionTypes.SEARCH_PRODUCT_TYPES_START:
    case productTypesActionTypes.REMOVE_PRODUCT_TYPE_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case productTypesActionTypes.FETCH_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        productTypesList: action.payload.productTypesList,
        count: action.payload.count,
      };
    case productTypesActionTypes.SEARCH_PRODUCT_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        productTypesList: action.payload,
      };
    case productTypesActionTypes.ADD_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        productTypesList: [...state.productTypesList, action.payload],
        count: state.count + 1,
      };
    case productTypesActionTypes.REMOVE_PRODUCT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        productTypesList: state.productTypesList.filter(
          (item) => item._id.toString() !== action.payload.toString()
        ),
        count: state.count - 1,
      };
    case productTypesActionTypes.FETCH_PRODUCT_TYPES_FAIL:
    case productTypesActionTypes.ADD_PRODUCT_TYPE_FAIL:
    case productTypesActionTypes.SEARCH_PRODUCT_TYPES_FAIL:
    case productTypesActionTypes.REMOVE_PRODUCT_TYPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
