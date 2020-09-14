import productCommentReviewsActionTypes from "./product-comment-review.types";

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
    default:
      return state;
  }
};
