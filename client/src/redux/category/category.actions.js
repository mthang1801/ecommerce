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
    payload: {
      msg: err.response.data.message,
      status: err.response.status,
    },
  };
};

export const fetchCategory = (categoryId, min_price, max_price, page = 1) => async (dispatch) => {
  try {
    console.log(min_price, max_price)
    dispatch(fetchCategoryStart());
    let { data } = await axios.get(
      urls.GET_CONTENT_LIST_BY_CATEGORY_PATH_URL(categoryId,+min_price, +max_price, page)
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
