import productTypeActionTypes from "./product-type.types";
import axios from "axios";
import urls from "../../utils/urls";
import { filter } from "bluebird";
export const fetchProductTypeStart = () => ({
  type: productTypeActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_TYPE_START,
});
export const fetchProductTypeSuccess = ({
  name,
  productGroupList,
  manufactorList,
  discountProductList,
  topRatedProducts,
  bestSellerProducts,
  productList,
  numProducts,
  currentPage,
  numPages,
  maxPrice,
}) => ({
  type: productTypeActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_TYPE_SUCCESS,
  payload: {
    name,
    productGroupList,
    manufactorList,
    discountProductList,
    topRatedProducts,
    bestSellerProducts,
    productList,
    numProducts,
    currentPage,
    numPages,
    maxPrice,
  },
});
export const fetchProductTypeFail = (err) => ({
  type: productTypeActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_TYPE_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductType = (
  categoryPath,
  productTypePath,
  page = 1
) => async (dispatch) => {
  try {
    dispatch(fetchProductTypeStart());
    let { data } = await axios.get(
      urls.GET_CONTENT_LIST_BY_PRODUCT_TYPE_URL(
        categoryPath,
        productTypePath,
        page
      )
    );
    data.currentPage = page;
    dispatch(fetchProductTypeSuccess(data));
  } catch (error) {
    dispatch(fetchProductTypeFail(error));
  }
};

export const setCurrentPage = (curPage) => ({
  type: productTypeActionTypes.SET_CURRENT_PAGE,
  payload: curPage,
});

export const fetchProductListStart = () => ({
  type: productTypeActionTypes.FETCH_PRODUCT_LIST_START,
});
export const fetchProductListSuccess = (productList) => ({
  type: productTypeActionTypes.FETCH_PRODUCT_LIST_SUCCESS,
  payload: productList,
});
export const fetchProductListFail = (err) => ({
  type: productTypeActionTypes.FETCH_PRODUCT_LIST_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductList = (categoryPath, productTypePath, page) => async (
  dispatch
) => {
  try {
    dispatch(fetchProductListStart());
    const { data } = await axios.get(
      urls.GET_PRODUCT_LIST_PER_PAGE_BY_PRODUCT_TYPE_PATH_URL(
        categoryPath,
        productTypePath,
        page
      )
    );
    dispatch(fetchProductListSuccess(data));
  } catch (error) {
    dispatch(fetchProductListFail(error));
  }
};
const filterProductsByPriceStart = () => ({
  type: productTypeActionTypes.FILTER_PRODUCTS_BY_PRICE_START,
});
const filterProductsByPriceSuccess = (
  productList,
  numProducts,
  currentPage,
  numPages,
  maxPrice
) => ({
  type: productTypeActionTypes.FILTER_PRODUCTS_BY_PRICE_SUCCESS,
  payload: { productList, numProducts, currentPage, numPages, maxPrice },
});
const filterProductsByPriceFail = (err) => ({
  type: productTypeActionTypes.FILTER_PRODUCTS_BY_PRICE_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const filterProductsByPrice = (
  categoryPath,
  productTypePath,
  minPriceChange,
  maxPriceChange,
  page = 1
) => async (dispatch) => {
  try {
    dispatch(filterProductsByPriceStart());
    const {
      data: { productList, numProducts, currentPage, numPages, maxPrice },
    } = await axios.get(
      urls.GET_PRODUCT_LIST_BY_FILTER_PRICE_IN_PRODUCT_TYPE(
        categoryPath,
        productTypePath,
        minPriceChange,
        maxPriceChange,
        page
      )
    );
    dispatch(
      filterProductsByPriceSuccess(
        productList,
        numProducts,
        currentPage,
        numPages,
        maxPrice
      )
    );
  } catch (error) {
    dispatch(filterProductsByPriceFail(error));
  }
};
