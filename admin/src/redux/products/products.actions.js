import productActionTypes from "./products.types";
import axios from "axios";
import { addProductTypeFail } from "../product-types/product-types.actions";

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
  productPage = +sessionStorage.getItem("productPage") || 1,
  numPerPage = +sessionStorage.getItem("numProductsPerPage") || 5
) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(fetchProductsStart());
      const {
        data: { productsList, count },
      } = await axios.get(`/products?page=${productPage}&number=${numPerPage}`);
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
      dispatch(addProductTypeFail(error.message));
      reject(error.message);
    }
  });
};
