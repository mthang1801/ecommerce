import { createSelector } from "reselect";

const selectCommentReviews = (state) => state.commentReviews;

export const selectComments = createSelector(
  selectCommentReviews,
  (commentReviews) => commentReviews.comments
);

export const selectCommentsLoading = createSelector(
  selectCommentReviews,
  (commentReviews) => commentReviews.loading
);

export const selectNumberOfComments = createSelector(
  selectCommentReviews,
  (commentReviews) => commentReviews.numberOfComments
);
export const selectNumberOfCommentsAndResponses = createSelector(
  selectCommentReviews,
  (commentReviews) => commentReviews.numberOfCommentsAndResponses
);

export const selectCommentReviewsError = createSelector(
  selectCommentReviews,
  (commentReviews) => (commentReviews.error ? commentReviews.error.msg : null)
);

export const selectCommentResponses = createSelector(
  selectCommentReviews,
  (commentReviews) => commentReviews.responses
);
