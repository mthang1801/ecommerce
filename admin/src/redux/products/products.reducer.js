import productActionTypes from "./products.types";
import { editProduct } from "./products.utils";
const INITIAL_STATE = {
  productsList: [],
  loading: false,
  error: undefined,
  count: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productActionTypes.FETCH_PRODUCTS_START:
    case productActionTypes.ADD_PRODUCT_START:
    case productActionTypes.EDIT_PRODUCT_START:
    case productActionTypes.REMOVE_PRODUCT_START:
      return {
        ...state,
        loading: true,
      };
    case productActionTypes.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsList: action.payload.productsList,
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
    case productActionTypes.EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        productsList: editProduct(state.productsList, action.payload),
        loading: false,
      };
    case productActionTypes.REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        productsList: state.productsList.filter(
          (item) => item._id.toString() !== action.payload.toString()
        ),
        count: state.count - 1,
        loading: false,
      };
    case productActionTypes.FETCH_PRODUCTS_FAIL:
    case productActionTypes.ADD_PRODUCT_FAIL:
    case productActionTypes.EDIT_PRODUCT_FAIL:
    case productActionTypes.REMOVE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
