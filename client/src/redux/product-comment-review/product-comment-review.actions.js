import productCommentReviewActionTypes from "./product-comment-review.types";
import axios from "axios";
import urls from "../../utils/urls";
const fetchProductReviewStart = () => ({
  type: productCommentReviewActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_START,
});

const fetchProductReviewSuccess = (productReview) => ({
  type: productCommentReviewActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_SUCCESS,
  payload: productReview,
});

const fetchProductReviewFail = (err) => ({
  type: productCommentReviewActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductReview = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductReviewStart());
    const { data } = await axios.get(
      urls.GET_PRODUCT_COMMENT_REVIEWS(productId)
    );
    dispatch(fetchProductReviewSuccess(data));
  } catch (error) {
    dispatch(fetchProductReviewFail(error));
  }
};
