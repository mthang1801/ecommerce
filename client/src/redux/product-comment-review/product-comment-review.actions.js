import productCommentReviewActionTypes from "./product-comment-review.types";
import axios from "axios";
import urls from "../../utils/urls";
const fetchProductCommentReviewStart = () => ({
  type: productCommentReviewActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_START,
});

const fetchProductCommentReviewSuccess = (
  comments,
  responses,
  numberOfComments,
  numberOfCommentsAndResponses
) => {
  return {
    type: productCommentReviewActionTypes.FETCH_PRODUCT_COMMENT_REVIEW_SUCCESS,
    payload: {
      comments,
      responses,
      numberOfComments,
      numberOfCommentsAndResponses,
    },
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
      data: {
        comments,
        responses,
        numberOfComments,
        numberOfCommentsAndResponses,
      },
    } = await axios.get(urls.GET_PRODUCT_COMMENT_REVIEWS(productId));

    dispatch(
      fetchProductCommentReviewSuccess(
        comments,
        responses,
        numberOfComments,
        numberOfCommentsAndResponses
      )
    );
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
export const postLikeOrUnlikeComment = (commentId, userId) => async (
  dispatch
) => {
  try {
    const { data } = await axios.post(
      urls.POST_LIKE_OR_UNLIKE_COMMENT(commentId)
    );
    console.log(data);
    if (data.msg == "like success") {
      dispatch(setLikeForComment(commentId, userId));
    } else {
      dispatch(setUnlikeForComment(commentId, userId));
    }
  } catch (error) {
    console.log(error);
  }
};
export const setDislikeForComment = (commentId, userId) => ({
  type: productCommentReviewActionTypes.SET_DISLIKE_FOR_COMMENT,
  payload: { commentId, userId },
});

export const setUndislikeForComment = (commentId, userId) => ({
  type: productCommentReviewActionTypes.SET_UNDISLIKE_FOR_COMMENT,
  payload: { commentId, userId },
});
export const postDislikeOrUndislikeComment = (commentId, userId) => async (
  dispatch
) => {
  try {
    const { data } = await axios.post(
      urls.POST_DISLIKE_OR_UNDISLIKE_COMMENT(commentId)
    );

    if (data.msg == "dislike success") {
      dispatch(setDislikeForComment(commentId, userId));
    } else {
      dispatch(setUndislikeForComment(commentId, userId));
    }
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export const setResponseComment = (commentId, response) => ({
  type: productCommentReviewActionTypes.SET_RESPONSE_COMMENT,
  payload: { commentId, response },
});

export const postResponseComment = (commentId, text) => async (dispatch) => {
  try {
    const { data } = await axios.post(urls.POST_RESPONSE_COMMENT(commentId), {
      text,
    });
    dispatch(setResponseComment(commentId, data));
  } catch (error) {
    console.log(error);
  }
};

export const setLikeForResponseComment = (responseId, userId) => ({
  type: productCommentReviewActionTypes.SET_LIKE_FOR_RESPONSE_COMMENT,
  payload: { responseId, userId },
});

export const setUnlikeForResponseComment = (responseId, userId) => ({
  type: productCommentReviewActionTypes.SET_UNLIKE_FOR_RESPONSE_COMMENT,
  payload: { responseId, userId },
});

export const postLikeOrUnlikeResponseComment = (responseId, userId) => async (
  dispatch
) => {
  try {
    console.log(responseId, userId);
    const { data } = await axios.post(
      urls.POST_LIKE_OR_UNLIKE_RESPONSE_COMMENT(responseId)
    );
    if (data.msg === "like success") {
      dispatch(setLikeForResponseComment(responseId, userId));
    } else {
      dispatch(setUnlikeForResponseComment(responseId, userId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const setDislikeForResponseComment = (responseId, userId) => ({
  type: productCommentReviewActionTypes.SET_DISLIKE_FOR_RESPONSE_COMMENT,
  payload: { responseId, userId },
});

export const setUndislikeForResponseComment = (responseId, userId) => ({
  type: productCommentReviewActionTypes.SET_UNDISLIKE_FOR_RESPONSE_COMMENT,
  payload: { responseId, userId },
});
export const postDislikeOrUndislikeResponseComment = (
  responseId,
  userId
) => async (dispatch) => {
  try {
    console.log(responseId, userId);
    const { data } = await axios.post(
      urls.POST_DISLIKE_OR_UNDISLIKE_RESPONSE_COMMENT(responseId)
    );
    if (data.msg === "dislike success") {
      dispatch(setDislikeForResponseComment(responseId, userId));
    } else {
      dispatch(setUndislikeForResponseComment(responseId, userId));
    }
  } catch (error) {
    console.log(error);
  }
};

export const setResponseToResponseComment = (commentId, userId, response) => ({
  type: productCommentReviewActionTypes.SET_RESPONSE_TO_RESPONSE_COMMENT,
  payload: { commentId, userId, response },
});

export const postResponseToResponseComment = (
  commentId,
  userId,
  text
) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      urls.POST_RESPONSE_TO_REPONSE_COMMENT(commentId),
      {
        text,
      }
    );
    dispatch(setResponseToResponseComment(commentId, userId, data));
  } catch (error) {
    console.log(error);
  }
};

export const setReadMoreResponses = (commentId, responses) => ({
  type: productCommentReviewActionTypes.GET_READ_MORE_RESPONSES,
  payload: { commentId, responses },
});

export const getReadMoreResponses = (commentId, skip) => async (dispatch) => {
  try {
    const { data } = await axios.get(urls.READ_MORE_RESPONSES(commentId, skip));
    dispatch(setReadMoreResponses(commentId, data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchReadMoreCommentsStart = () => ({
  type: productCommentReviewActionTypes.FETCH_READ_MORE_COMMENTS_START,
});

export const fetchReadMoreCommentsSuccess = (comments, responses) => ({
  type: productCommentReviewActionTypes.FETCH_READ_MORE_COMMENTS_SUCCESS,
  payload: { comments, responses },
});

export const fetchReadMoreCommentsFail = (err) => ({
  type: productCommentReviewActionTypes.FETCH_READ_MORE_COMMENTS_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchMoreComments = (productId, skip) => async (dispatch) => {
  try {
    dispatch(fetchReadMoreCommentsStart());
    const {
      data: { comments, responses },
    } = await axios.get(urls.GET_MORE_COMMENTS(productId, skip));
    dispatch(fetchReadMoreCommentsSuccess(comments, responses));
  } catch (error) {
    dispatch(fetchReadMoreCommentsFail(error));
  }
};
