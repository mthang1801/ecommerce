import productCommentReviewsActionTypes from "./product-comment-review.types";
import {
  setLikeForComment,
  setUnlikeForComment,
  setDislikeForComment,
  setUndislikeForComment,
} from "./product-comment-review.utils";
const INITIAL_STATE = {
  comments: [],
  numberOfComments: 0,
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productCommentReviewsActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case productCommentReviewsActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload.comments,
        numberOfComments: action.payload.numberOfComments,
      };
    case productCommentReviewsActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case productCommentReviewsActionTypes.SET_LIKE_FOR_COMMENT:
      return {
        ...state,
        comments: setLikeForComment(
          state.comments,
          action.payload.commentId,
          action.payload.userId
        ),
      };
    case productCommentReviewsActionTypes.SET_UNLIKE_FOR_COMMENT:
      return {
        ...state,
        comments: setUnlikeForComment(
          state.comments,
          action.payload.commentId,
          action.payload.userId
        ),
      };
    case productCommentReviewsActionTypes.SET_DISLIKE_FOR_COMMENT:
      return {
        ...state,
        comments: setDislikeForComment(
          state.comments,
          action.payload.commentId,
          action.payload.userId
        ),
      };
    case productCommentReviewsActionTypes.SET_UNDISLIKE_FOR_COMMENT:
      return {
        ...state,
        comments: setUndislikeForComment(
          state.comments,
          action.payload.commentId,
          action.payload.userId
        ),
      };
    default:
      return state;
  }
};
