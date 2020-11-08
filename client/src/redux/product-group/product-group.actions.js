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
  productGroupId,
  min_price,
  max_price, 
  page = 1 
) => async (dispatch) => {
  try {
    dispatch(fetchProductGroupStart());    
    let { data } = await axios.get(
      urls.GET_CONTENT_LIST_BY_PRODUCT_GROUP_PATH_URL(
        productGroupId,
        min_price,
        max_price, 
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
