import productReviewsActionTypes from "./product-reviews.types";
import urls from "../../utils/urls";
import axios from "axios";
const fetchProductReviewsStart = () => ({
  type: productReviewsActionTypes.FETCH_PRODUCT_REVIEW_START,
});

const fetchProductReviewsSuccess = (product) => ({
  type: productReviewsActionTypes.FETCH_PRODUCT_REVIEW_SUCCESS,
  payload: product,
});

const fetchProductReviewsFail = (err) => ({
  type: productReviewsActionTypes.FETCH_PRODUCT_REVIEW_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductReviewsStart());
    const { data } = await axios.get(urls.GET_PRODUCT_REVIEWS(productId));
    dispatch(fetchProductReviewsSuccess(data));
  } catch (error) {
    dispatch(fetchProductReviewsFail(error));
  }
};
