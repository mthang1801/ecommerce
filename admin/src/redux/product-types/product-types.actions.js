import productTypesActionTypes from "./product-types.types";

export const fetchProductTypesStart = () => ({
  type: productTypesActionTypes.FETCH_PRODUCT_TYPES_START,
});

export const fetchProductTypesSuccess = (productTypes) => ({
  type: productTypesActionTypes.FETCH_PRODUCT_TYPES_SUCCESS,
  payload: productTypes,
});

export const fetchProductTypeFail = (err) => ({
  type: productTypesActionTypes.FETCH_PRODUCT_TYPES_FAIL,
  payload: err,
});
