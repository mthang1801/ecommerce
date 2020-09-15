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

export const setLikeForComment = (commentId, userId) => ({
  type: productCommentReviewActionTypes.SET_LIKE_FOR_COMMENT,
  payload: { commentId, userId },
});

export const setUnlikeForComment = (commentId, userId) => ({
  type: productCommentReviewActionTypes.SET_UNLIKE_FOR_COMMENT,
  payload: { commentId, userId },
});
export const setDislikeForComment = (commentId, userId) => ({
  type: productCommentReviewActionTypes.SET_DISLIKE_FOR_COMMENT,
  payload: { commentId, userId },
});

export const setUndislikeForComment = (commentId, userId) => ({
  type: productCommentReviewActionTypes.SET_UNDISLIKE_FOR_COMMENT,
  payload: { commentId, userId },
});
