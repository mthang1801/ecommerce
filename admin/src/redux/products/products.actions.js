import productActionTypes from "./products.types";
import axios from "axios";

export const fetchProductsStart = () => ({
  type: productActionTypes.FETCH_PRODUCTS_START,
});
export const fetchProductsSuccess = (productsList, count) => ({
  type: productActionTypes.FETCH_PRODUCTS_SUCCESS,
  payload: { productsList, count },
});
export const fetchProductsFail = (err) => ({
  type: productActionTypes.FETCH_PRODUCTS_FAIL,
  payload: err,
});

export const fetchProducts = (
  page = +sessionStorage.getItem("productPage") || 1,
  numPerPage = +sessionStorage.getItem("numProductsPerPage") || 5
) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(fetchProductsStart());
      const {
        data: { productsList, count },
      } = await axios.get(`/products?page=${page}&number=${numPerPage}`);
      dispatch(fetchProductsSuccess(productsList, count));
      resolve(true);
    } catch (error) {
      dispatch(fetchProductsFail(error.message));
      reject(error.message);
    }
  });
};

export const addProductStart = () => ({
  type: productActionTypes.ADD_PRODUCT_START,
});
export const addProductSuccess = (product) => ({
  type: productActionTypes.ADD_PRODUCT_SUCCESS,
  payload: product,
});
export const addProductFail = (err) => ({
  type: productActionTypes.ADD_PRODUCT_FAIL,
  payload: err,
});

export const addProduct = (product) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(addProductStart());
      const { data } = await axios.post("/admin/products", product);
      dispatch(addProductSuccess(data));
      resolve(true);
    } catch (error) {
      dispatch(addProductFail(error.message));
      reject(error.message);
    }
  });
};

export const editProductStart = () => ({
  type: productActionTypes.EDIT_PRODUCT_START,
});

export const editProductSuccess = (product) => ({
  type: productActionTypes.EDIT_PRODUCT_SUCCESS,
  payload: product,
});

export const editProductFail = (err) => ({
  type: productActionTypes.EDIT_PRODUCT_FAIL,
  payload: err,
});

export const editProduct = (product) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(editProductStart());
      const { data } = await axios({
        url: "/admin/products",
        method: "PUT",
        data: { product },
      });
      dispatch(editProductSuccess(data));
      resolve(true);
    } catch (error) {
      dispatch(editProductFail(error.message));
      reject(error);
    }
  });
};

export const findProductById = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(productId);
      const { data } = await axios.get(`/products/${productId}`);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
export const removeProductStart = () => ({
  type: productActionTypes.REMOVE_PRODUCT_START,
});
export const removeProductSuccess = (id) => ({
  type: productActionTypes.REMOVE_PRODUCT_SUCCESS,
  payload: id,
});
export const removeProductFail = (err) => ({
  type: productActionTypes.REMOVE_PRODUCT_FAIL,
  payload: err,
});

export const removeProduct = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(removeProductStart());
      await axios.delete("/admin/products", { params: { id } });
      dispatch(removeProductSuccess(id));
      resolve(true);
    } catch (error) {
      dispatch(removeProductFail(error.message));
      reject(error);
    }
  });
};
