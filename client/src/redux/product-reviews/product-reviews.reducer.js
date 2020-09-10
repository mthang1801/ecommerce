import productReviewsActionTypes from "./product-reviews.types";

const INITIAL_STATE = {
  product: null,
  loading: true,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case productReviewsActionTypes.FETCH_PRODUCT_REVIEW_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case productReviewsActionTypes.FETCH_PRODUCT_REVIEW_SUCCESS:
      return {
        ...state,
        product: { ...action.payload },
        loading: false,
      };
    case productReviewsActionTypes.FETCH_PRODUCT_REVIEW_FAIL:
      return {
        ...state,
        error: { ...action.payload },
      };
    default:
      return state;
  }
};
