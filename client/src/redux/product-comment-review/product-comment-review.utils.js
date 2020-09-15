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
