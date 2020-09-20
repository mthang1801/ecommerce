import manufactorActionTypes from "./manufactor.types";
import axios from "axios";
import urls from "../../utils/urls";
const fetchManufactorStart = () => ({
  type: manufactorActionTypes.FETCH_CONTENT_LIST_BY_MANUFACTOR_PATH_URL_START,
});

const fetchManufactorSuccess = ({
  name,
  productGroupList,
  productList,
  numProducts,
  currentPage,
  numPages,
  maxPrice,
}) => ({
  type: manufactorActionTypes.FETCH_CONTENT_LIST_BY_MANUFACTOR_PATH_URL_SUCCESS,
  payload: {
    name,
    productGroupList,
    productList,
    numProducts,
    currentPage,
    numPages,
    maxPrice,
  },
});

const fetchManufactorFail = (err) => ({
  type: manufactorActionTypes.FETCH_CONTENT_LIST_BY_MANUFACTOR_PATH_URL_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchManufactor = (pathUrl, page) => async (dispatch) => {
  try {
    console.log(pathUrl);
    dispatch(fetchManufactorStart());
    let { data } = await axios.get(
      urls.GET_CONTENT_LIST_BY_MANUFACTOR_PATH_URL(pathUrl, page)
    );
    data.currentPage = page;
    dispatch(fetchManufactorSuccess(data));
  } catch (error) {
    dispatch(fetchManufactorFail(error));
  }
};

export const setCurrentPage = (curPage) => ({
  type: manufactorActionTypes.SET_CURRENT_PAGE,
  payload: curPage,
});

export const fetchProductListStart = () => ({
  type: manufactorActionTypes.FETCH_PRODUCT_LIST_START,
});
export const fetchProductListSuccess = (productList) => ({
  type: manufactorActionTypes.FETCH_PRODUCT_LIST_SUCCESS,
  payload: productList,
});
export const fetchProductListFail = (err) => ({
  type: manufactorActionTypes.FETCH_PRODUCT_LIST_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductList = (pathUrl, page) => async (dispatch) => {
  try {
    dispatch(fetchProductListStart());
    const { data } = await axios.get(
      urls.GET_PRODUCT_LIST_PER_PAGE_BY_MANUFACTOR_PATH_URL(pathUrl, page)
    );
    dispatch(fetchProductListSuccess(data));
  } catch (error) {
    dispatch(fetchProductListFail(error));
  }
};
const filterProductsByPriceStart = () => ({
  type: manufactorActionTypes.FILTER_PRODUCTS_BY_PRICE_START,
});
const filterProductsByPriceSuccess = (
  name,
  productGroupList,
  productList,
  numProducts,
  currentPage,
  numPages,
  maxPrice
) => ({
  type: manufactorActionTypes.FILTER_PRODUCTS_BY_PRICE_SUCCESS,
  payload: {
    name,
    productGroupList,
    productList,
    numProducts,
    currentPage,
    numPages,
    maxPrice,
  },
});
const filterProductsByPriceFail = (err) => ({
  type: manufactorActionTypes.FILTER_PRODUCTS_BY_PRICE_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const filterProductsByPrice = (
  manufactorPath,
  minPriceChange,
  maxPriceChange,
  page = 1
) => async (dispatch) => {
  try {
    dispatch(filterProductsByPriceStart());
    const {
      data: {
        name,
        productGroupList,
        productList,
        numProducts,
        currentPage,
        numPages,
        maxPrice,
      },
    } = await axios.get(
      urls.GET_PRODUCT_LIST_BY_FILTER_PRICE_IN_MANUFACTOR(
        manufactorPath,
        minPriceChange,
        maxPriceChange,
        page
      )
    );
    dispatch(
      filterProductsByPriceSuccess(
        name,
        productGroupList,
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
