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
  latestProductList,
  productList,
  numProducts,
  numPages,
  maxPrice,
}) => ({
  type: categoryActionTypes.FETCH_CONTENT_LIST_BY_CATEGORY_PATH_URL_SUCCESS,
  payload: {
    categoryList,
    productTypeList,
    discountProductList,
    topRatedProducts,
    bestSellerProducts,
    latestProductList,
    productList,
    numProducts,
    numPages,
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
    const { data } = await axios.get(
      urls.GET_CONTENT_LIST_BY_CATEGORY_PATH_URL(path, page)
    );
    dispatch(fetchCategorySuccess(data));
  } catch (error) {
    dispatch(fetchCategoryFail(error));
  }
};
