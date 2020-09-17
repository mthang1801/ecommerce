export const setLikeForComment = (comments, commentId, userId) => {
  return comments.map((comment) => {
    if (comment._id == commentId) {
      comment.likes.push(userId);
      comment.dislikes = comment.dislikes.filter((_id) => _id != userId);
    }
    return comment;
  });
};

export const setUnlikeForComment = (comments, commentId, userId) => {
  return comments.map((comment) => {
    if (comment._id == commentId) {
      comment.likes = comment.likes.filter((_id) => _id != userId);
    }
    return comment;
  });
};
export const setDislikeForComment = (comments, commentId, userId) => {
  return comments.map((comment) => {
    if (comment._id == commentId) {
      comment.dislikes.push(userId);
      comment.likes = comment.likes.filter((_id) => _id != userId);
    }
    return comment;
  });
};

export const setUndislikeForComment = (comments, commentId, userId) => {
  return comments.map((comment) => {
    if (comment._id == commentId) {
      comment.dislikes = comment.dislikes.filter((_id) => _id != userId);
    }
    return comment;
  });
};

export const setResponseComment = (comments, commentId, response) => {
  return comments.map((comment) => {
    if (comment._id == commentId) {
      comment.responses.push(response);
    }
    return comment;
  });
};
export const setLikeForResponseComment = (responses, responseId, userId) => {
  return responses.map((response) => {
    if (response._id == responseId) {
      response.likes.push(userId);
      response.dislikes = response.dislikes.filter((_id) => _id !== userId);
    }
    return response;
  });
};

export const setUnlikeForResponseComment = (responses, responseId, userId) =>
  responses.map((response) => {
    if (response._id == responseId) {
      response.likes = response.likes.filter((_id) => _id !== userId);
    }
    return response;
  });

export const setDislikeForResponseComment = (responses, responseId, userId) =>
  responses.map((response) => {
    if (response._id == responseId) {
      response.dislikes.push(userId);
      response.likes = response.likes.filter((_id) => _id != userId);
    }
    return response;
  });

export const setUndislikeForResponseComment = (responses, responseId, userId) =>
  responses.map((response) => {
    if (response._id == responseId) {
      response.dislikes = response.dislikes.filter((_id) => _id != userId);
    }
    return response;
  });
