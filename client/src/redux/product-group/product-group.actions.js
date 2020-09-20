import productGroupActionTypes from "./product-group.types";
import axios from "axios";
import urls from "../../utils/urls";
export const fetchProductGroupStart = () => ({
  type: productGroupActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_GROUP_START,
});
export const fetchProductGroupSuccess = ({
  name,
  discountProductList,
  topRatedProducts,
  bestSellerProducts,
  productList,
  numProducts,
  currentPage,
  numPages,
  maxPrice,
}) => ({
  type: productGroupActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_GROUP_SUCCESS,
  payload: {
    name,
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
export const fetchProductGroupFail = (err) => ({
  type: productGroupActionTypes.FETCH_CONTENT_LIST_BY_PRODUCT_GROUP_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductGroup = (
  categoryPath,
  productTypePath,
  productGroupPath,
  page
) => async (dispatch) => {
  try {
    dispatch(fetchProductGroupStart());
    console.log(productGroupPath);
    let { data } = await axios.get(
      urls.GET_CONTENT_LIST_BY_PRODUCT_GROUP_PATH_URL(
        categoryPath,
        productTypePath,
        productGroupPath,
        page
      )
    );
    data.currentPage = page;
    dispatch(fetchProductGroupSuccess(data));
  } catch (error) {
    dispatch(fetchProductGroupFail(error));
  }
};

export const setCurrentPage = (curPage) => ({
  type: productGroupActionTypes.SET_CURRENT_PAGE,
  payload: curPage,
});

export const fetchProductListStart = () => ({
  type: productGroupActionTypes.FETCH_PRODUCT_LIST_START,
});
export const fetchProductListSuccess = (productList) => ({
  type: productGroupActionTypes.FETCH_PRODUCT_LIST_SUCCESS,
  payload: productList,
});
export const fetchProductListFail = (err) => ({
  type: productGroupActionTypes.FETCH_PRODUCT_LIST_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductList = (
  categoryPath,
  productTypePath,
  productGroupPath,
  page
) => async (dispatch) => {
  try {
    console.log(page);
    dispatch(fetchProductListStart());
    const { data } = await axios.get(
      urls.GET_PRODUCT_LIST_PER_PAGE_BY_PRODUCT_GROUP_PATH_URL(
        categoryPath,
        productTypePath,
        productGroupPath,
        page
      )
    );
    dispatch(fetchProductListSuccess(data));
  } catch (error) {
    dispatch(fetchProductListFail(error));
  }
};

const filterProductsByPriceStart = () => ({
  type: productGroupActionTypes.FILTER_PRODUCTS_BY_PRICE_START,
});
const filterProductsByPriceSuccess = (
  name,
  productList,
  numProducts,
  currentPage,
  numPages,
  maxPrice
) => ({
  type: productGroupActionTypes.FILTER_PRODUCTS_BY_PRICE_SUCCESS,
  payload: {
    name,
    productList,
    numProducts,
    currentPage,
    numPages,
    maxPrice,
  },
});
const filterProductsByPriceFail = (err) => ({
  type: productGroupActionTypes.FILTER_PRODUCTS_BY_PRICE_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const filterProductsByPrice = (
  categoryPath,
  productTypePath,
  productGroupPath,
  minPriceChange,
  maxPriceChange,
  page = 1
) => async (dispatch) => {
  try {
    dispatch(filterProductsByPriceStart());
    const {
      data: { name, productList, numProducts, currentPage, numPages, maxPrice },
    } = await axios.get(
      urls.GET_PRODUCT_LIST_BY_FILTER_PRICE_IN_PRODUCT_GROUP(
        categoryPath,
        productTypePath,
        productGroupPath,
        minPriceChange,
        maxPriceChange,
        page
      )
    );
    dispatch(
      filterProductsByPriceSuccess(
        name,
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
