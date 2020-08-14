import productTypesActionTypes from "./product-types.types";
import axios from "axios";

export const fetchProductTypesStart = () => ({
  type: productTypesActionTypes.FETCH_PRODUCT_TYPES_START,
});

export const fetchProductTypesSuccess = (productTypesList, count) => ({
  type: productTypesActionTypes.FETCH_PRODUCT_TYPES_SUCCESS,
  payload: { productTypesList, count },
});

export const fetchProductTypesFail = (err) => ({
  type: productTypesActionTypes.FETCH_PRODUCT_TYPES_FAIL,
  payload: err,
});

export const fetchProductTypes = (
  page = +sessionStorage.getItem("page") || 1,
  numPerPage = +sessionStorage.getItem("numPerPage") || 5
) => async (dispatch) => {
  try {
    dispatch(fetchProductTypesStart());
    const { data } = await axios({
      method: "GET",
      url: `/product-types?page=${page}&number=${numPerPage}`,
    });
    dispatch(fetchProductTypesSuccess(data.productTypesList, data.count));
  } catch (error) {
    dispatch(fetchProductTypesFail(error.message));
  }
};

export const addProductTypeStart = () => ({
  type: productTypesActionTypes.ADD_PRODUCT_TYPE_START,
});

export const addProductTypeSuccess = (newProductTypes) => ({
  type: productTypesActionTypes.ADD_PRODUCT_TYPE_SUCCESS,
  payload: newProductTypes,
});

export const addProductTypeFail = (err) => ({
  type: productTypesActionTypes.ADD_PRODUCT_TYPE_FAIL,
  payload: err,
});

export const addProductType = (productType) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(addProductTypeStart());
      const { data } = await axios({
        method: "POST",
        url: "/admin/product-types",
        data: productType,
      });
      dispatch(addProductTypeSuccess(data));
      resolve(true);
    } catch (error) {
      dispatch(addProductTypeFail(error.message));
      reject(error.message);
    }
  });
};

export const searchProductTypeStart = () => ({
  type: productTypesActionTypes.SEARCH_PRODUCT_TYPES_START,
});
export const searchProductTypeSuccess = (productTypesList) => ({
  type: productTypesActionTypes.SEARCH_PRODUCT_TYPES_SUCCESS,
  payload: productTypesList,
});
export const searchProductTypeFail = (err) => ({
  type: productTypesActionTypes.SEARCH_PRODUCT_TYPES_FAIL,
  payload: err,
});

export const searchProductTypes = (searchKey) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(searchProductTypeStart());
      const { data } = await axios({
        method: "GET",
        url: `/product-types?search=${searchKey}`,
      });
      dispatch(searchProductTypeSuccess(data));
      resolve(true);
    } catch (error) {
      dispatch(searchProductTypeFail(error.message));
      reject(error.message);
    }
  });
};

export const findProductTypesById = (productTypeId) => {
  if (!productTypeId) {
    return null;
  }
  return new Promise(async (resolve, reject) => {
    try {
      console.log(productTypeId);
      const { data } = await axios({
        method: "GET",
        url: `/product-types/${productTypeId}`,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const editProductTypesStart = () => ({
  type: productTypesActionTypes.EIDT_PRODUCT_TYPE_START,
});
export const editProductTypesSuccess = (productType) => ({
  type: productTypesActionTypes.EIDT_PRODUCT_TYPE_SUCCESS,
  payload: productType,
});
export const editProductTypesFail = (err) => ({
  type: productTypesActionTypes.EIDT_PRODUCT_TYPE_FAIL,
  payload: err,
});

export const editProductTypes = (productTypesData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productTypesData) {
        reject(new Error("Không tìm thấy loại sp"));
      }
      dispatch(editProductTypesStart());
      console.log(productTypesData);
      const { data } = await axios({
        url: "/admin/product-types",
        method: "PUT",
        data: productTypesData,
      });
      console.log(data);
      dispatch(editProductTypesSuccess());
      resolve(true);
    } catch (error) {
      dispatch(editProductTypesFail(error.message));
      reject(error);
    }
  });
};

export const removeProductTypeStart = () => ({
  type: productTypesActionTypes.REMOVE_PRODUCT_TYPE_START,
});

export const removeProductTypeSuccess = (id) => ({
  type: productTypesActionTypes.REMOVE_PRODUCT_TYPE_SUCCESS,
  payload: id,
});

export const removeProductTypeFail = () => ({
  type: productTypesActionTypes.REMOVE_PRODUCT_TYPE_FAIL,
});

export const removeProductType = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(removeProductTypeStart());
      const res = await axios.delete("/admin/product-types", { data: { id } });
      dispatch(removeProductTypeSuccess(id));
      resolve(true);
    } catch (error) {
      dispatch(removeProductTypeFail(error.message));
      reject(error.message);
    }
  });
};
