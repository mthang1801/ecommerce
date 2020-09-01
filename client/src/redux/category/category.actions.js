import categoryActionTypes from "./category.types";
import axios from "axios";
import urls from "../../utils/urls";
export const fetchCategoryStart = () => {
  return {
    type: categoryActionTypes.FETCH_CONTENT_LIST_BY_CATEGORY_PATH_URL_START,
  };
};
export const fetchCategorySuccess = ({
  categoryList,
  productTypeList,
  discountProductList,
  topRatedProducts,
  bestSellerProducts,
  productList,
  numProducts,
  numPages,
  currentPage,
  maxPrice,
}) => ({
  type: categoryActionTypes.FETCH_CONTENT_LIST_BY_CATEGORY_PATH_URL_SUCCESS,
  payload: {
    categoryList,
    productTypeList,
    discountProductList,
    topRatedProducts,
    bestSellerProducts,
    productList,
    numProducts,
    numPages,
    currentPage,
    maxPrice,
  },
});
export const fetchCategoryFail = (err) => {
  return {
    type: categoryActionTypes.FETCH_CONTENT_LIST_BY_CATEGORY_PATH_URL_FAIL,
    payload: { msg: err.response.data.message, status: err.response.status },
  };
};

export const fetchCategory = (path, page = 1) => async (dispatch) => {
  try {
    dispatch(fetchCategoryStart());
    let { data } = await axios.get(
      urls.GET_CONTENT_LIST_BY_CATEGORY_PATH_URL(path, page)
    );
    data.currentPage = page;
    dispatch(fetchCategorySuccess(data));
  } catch (error) {
    dispatch(fetchCategoryFail(error));
  }
};

export const setCurrentPage = (curPage) => ({
  type: categoryActionTypes.SET_CURRENT_PAGE,
  payload: curPage,
});

export const fetchProductListStart = () => ({
  type: categoryActionTypes.FETCH_PRODUCT_LIST_START,
});
export const fetchProductListSuccess = (productList) => ({
  type: categoryActionTypes.FETCH_PRODUCT_LIST_SUCCESS,
  payload: productList,
});
export const fetchProductListFail = (err) => ({
  type: categoryActionTypes.FETCH_PRODUCT_LIST_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductList = (pathUrl, page) => async (dispatch) => {
  try {
    dispatch(fetchProductListStart());
    const { data } = await axios.get(
      urls.GET_PRODUCT_LIST_PER_PAGE_BY_CATEGORY_PATH_URL(pathUrl, page)
    );
    dispatch(fetchProductListSuccess(data));
  } catch (error) {
    dispatch(fetchCategoryFail(error));
  }
};
