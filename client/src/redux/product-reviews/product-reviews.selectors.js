import { createSelector } from "reselect";

const selectProductReviews = (state) => state.productReviews;

export const selectProductReviewsItem = createSelector(
  selectProductReviews,
  (productReviews) => productReviews.product
);
export const selectProductReviewsLoading = createSelector(
  selectProductReviews,
  (productReviews) => productReviews.loading
);
export const selectProductReviewsError = createSelector(
  selectProductReviews,
  (productReviews) => productReviews.error
);
