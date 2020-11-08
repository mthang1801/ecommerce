import productTypeActionTypes from "./product-type.types";
import axios from "axios";
import urls from "../../utils/urls";
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
  productTypeId,
  min_price,
  max_price,
  page = 1
) => async (dispatch) => {
  try {
    dispatch(fetchProductTypeStart());
    let { data } = await axios.get(
      urls.GET_CONTENT_LIST_BY_PRODUCT_TYPE_URL(
        productTypeId,
        min_price,
        max_price,
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
