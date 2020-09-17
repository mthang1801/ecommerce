import { setResponseToResponseComment } from "./product-comment-review.actions";
import productCommentReviewsActionTypes from "./product-comment-review.types";
import {
  setLikeForComment,
  setUnlikeForComment,
  setDislikeForComment,
  setUndislikeForComment,
  setResponseComment,
  setLikeForResponseComment,
  setUnlikeForResponseComment,
  setDislikeForResponseComment,
  setUndislikeForResponseComment,
} from "./product-comment-review.utils";
const INITIAL_STATE = {
  comments: [],
  responses: [],
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
        responses: action.payload.responses,
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
    case productCommentReviewsActionTypes.SET_RESPONSE_COMMENT:
      return {
        ...state,
        comments: setResponseComment(
          state.comments,
          action.payload.commentId,
          action.payload.response
        ),
      };
    case productCommentReviewsActionTypes.SET_LIKE_FOR_RESPONSE_COMMENT:
      return {
        ...state,
        responses: setLikeForResponseComment(
          state.responses,
          action.payload.responseId,
          action.payload.userId
        ),
      };
    case productCommentReviewsActionTypes.SET_UNLIKE_FOR_RESPONSE_COMMENT:
      return {
        ...state,
        responses: setUnlikeForResponseComment(
          state.responses,
          action.payload.responseId,
          action.payload.userId
        ),
      };
    case productCommentReviewsActionTypes.SET_DISLIKE_FOR_RESPONSE_COMMENT:
      return {
        ...state,
        responses: setDislikeForResponseComment(
          state.responses,
          action.payload.responseId,
          action.payload.userId
        ),
      };
    case productCommentReviewsActionTypes.SET_UNDISLIKE_FOR_RESPONSE_COMMENT:
      return {
        ...state,
        responses: setUndislikeForResponseComment(
          state.responses,
          action.payload.responseId,
          action.payload.userId
        ),
      };
    case productCommentReviewsActionTypes.SET_RESPONSE_TO_RESPONSE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment._id == action.payload.commentId) {
            comment.responses.push(action.payload.userId);
          }
          return comment;
        }),
        responses: [...state.responses, action.payload.response],
      };
    default:
      return state;
  }
};
