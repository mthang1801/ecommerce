import React, { useEffect, useState, useRef } from "react";
import { getCommentReviewsByProductId } from "../../../utils/connectDB";
import Spinner from "../../UI/spinner/spinner.component";
import {
  CommentReviewsWrapper,
  TextArea,
  CommentsGet,
  ReadMore,
  ButtonReadMore,
  CommentsPost,
} from "./comment-reviews.styles";
import CommentReviewsItem from "../comment-reviews-item/comment-reviews-item.component";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import {
  selectCommentsLoading,
  selectComments,
  selectCommentReviewsError,
  selectNumberOfComments,
} from "../../../redux/product-comment-review/product-comment-review.selectors";
import { selectProductDetailData } from "../../../redux/product-detail/product-detail.selectors";
import { createStructuredSelector } from "reselect";
import {
  fetchProductCommentReview,
  fetchMoreComments,
} from "../../../redux/product-comment-review/product-comment-review.actions";
import PopupLoader from "../../UI/popup-loader/popup-loader.component";
const CommentReviews = ({
  product,
  show,
  productId,
  comments,
  loading,
  error,
  fetchProductCommentReview,
  readMore,
  setReadMore,
  setTaskHeight,
  numberOfComments,
  fetchMoreComments,
}) => {
  const commentsRef = useRef(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const [commentItemHeight, setCommentItemHeight] = useState(0);
  const [readMoreComments, setReadMoreComments] = useState(false);
  useEffect(() => {
    if (numberOfComments > comments.length) {
      setReadMoreComments(true);
    } else {
      setReadMoreComments(false);
    }
  }, [numberOfComments, comments]);
  useEffect(() => {
    let _mounted = true;
    if (productId) {
      console.log(fetch)
      fetchProductCommentReview(productId);
    }
    if (commentsRef.current.scrollHeight > commentsRef.current.clientHeight) {
      setShowReadMore(true);
      setTaskHeight(commentsRef.current.scrollHeight + commentItemHeight);
    }
    return () => {
      _mounted = false;
    };
  }, [productId]);
  const handleClickReadMoreComments = (e) => {
    fetchMoreComments(product._id, comments.length);
  };
  return (
    <CommentReviewsWrapper ref={commentsRef} show={show}>
      {loading && !comments.length ? (
        <Spinner loadChildComponent />
      ) : (
        <React.Fragment>
          {loading ? <PopupLoader /> : null}
          <CommentsPost show={show}>
            <TextArea placeholder="Để lại bình luận của bạn tại đây" />
            <Button color="primary" variant="contained" size="small">
              Gửi
            </Button>
          </CommentsPost>
          <CommentsGet>
            {comments.length
              ? comments.map((comment) => {
                  return (
                    <CommentReviewsItem
                      key={comment._id}
                      comment={comment}
                      product={product}
                      setCommentItemHeight={(value) =>
                        setCommentItemHeight(value)
                      }
                    />
                  );
                })
              : null}
          </CommentsGet>
          {readMoreComments ? (
            <ButtonReadMore onClick={handleClickReadMoreComments}>
              Xem thêm bình luận
            </ButtonReadMore>
          ) : null}
        </React.Fragment>
      )}
      {showReadMore ? (
        <ReadMore onClick={() => setReadMore(true)}>
          {!readMore ? "Xem thêm" : "Thu gọn"}
        </ReadMore>
      ) : null}
    </CommentReviewsWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  comments: selectComments,
  loading: selectCommentsLoading,
  error: selectCommentReviewsError,
  product: selectProductDetailData,
  numberOfComments: selectNumberOfComments,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductCommentReview: (productId) =>
    dispatch(fetchProductCommentReview(productId)),
  fetchMoreComments: (productId, skip) =>
    dispatch(fetchMoreComments(productId, skip)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentReviews);
