import productCommentReviewActionTypes from "./product-comment-review.types";
import axios from "axios";
import urls from "../../utils/urls";
const fetchProductCommentReviewStart = () => ({
  type: productCommentReviewActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_START,
});

const fetchProductCommentReviewSuccess = (comments, numberOfComments) => {
  return {
    type: productCommentReviewActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_SUCCESS,
    payload: { comments: comments, numberOfComments: numberOfComments },
  };
};

const fetchProductCommentReviewFail = (err) => ({
  type: productCommentReviewActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchProductCommentReview = (productId) => async (dispatch) => {
  try {
    dispatch(fetchProductCommentReviewStart());
    const {
      data: { comments, numberOfComments },
    } = await axios.get(urls.GET_PRODUCT_COMMENT_REVIEWS(productId));

    dispatch(fetchProductCommentReviewSuccess(comments, numberOfComments));
  } catch (error) {
    dispatch(fetchProductCommentReviewFail(error));
  }
};
