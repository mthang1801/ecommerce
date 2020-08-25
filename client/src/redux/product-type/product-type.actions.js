import porductTypeActionTypes from "./product-type.types";

export const fetchProductTypeStart = () => ({
  type: porductTypeActionTypes.FETCH_PRODUCT_TYPE_LIST_START,
});
export const fetchProductTypeSuccess = (ProductTypeList) => ({
  type: porductTypeActionTypes.FETCH_PRODUCT_TYPE_LIST_SUCCESS,
  payload: ProductTypeList,
});
export const fetchProductTypeFail = (err) => ({
  type: porductTypeActionTypes.FETCH_PRODUCT_TYPE_LIST_FAIL,
  error: err,
});
