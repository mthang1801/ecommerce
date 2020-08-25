import porductActionTypes from "./product.types";

export const fetchProductStart = () => ({
  type: porductActionTypes.FETCH_PRODUCT_LIST_START,
});
export const fetchProductSuccess = (ProductList) => ({
  type: porductActionTypes.FETCH_PRODUCT_LIST_SUCCESS,
  payload: ProductList,
});
export const fetchProductFail = (err) => ({
  type: porductActionTypes.FETCH_PRODUCT_LIST_FAIL,
  error: err,
});
