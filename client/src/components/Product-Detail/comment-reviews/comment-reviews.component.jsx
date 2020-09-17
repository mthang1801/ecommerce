import React, { useEffect, useState, useRef } from "react";
import { getCommentReviewsByProductId } from "../../../utils/connectDB";
import Spinner from "../../UI/spinner/spinner.component";
import {
  CommentReviewsWrapper,
  TextArea,
  CommentsGet,
  ReadMore,
  CommentsPost
} from "./comment-reviews.styles";
import CommentReviewsItem from "../comment-reviews-item/comment-reviews-item.component";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {selectCommentsLoading, selectComments, selectCommentReviewsError} from "../../../redux/product-comment-review/product-comment-review.selectors"
import {selectProductDetailData} from "../../../redux/product-detail/product-detail.selectors"
import {createStructuredSelector} from "reselect"
import {fetchProductCommentReview} from "../../../redux/product-comment-review/product-comment-review.actions"
const CommentReviews = ({ product, show, productId, comments, loading, error, fetchProductCommentReview, readMore, setReadMore, setTaskHeight }) => {    
  const commentsRef = useRef(null);
  const [showReadMore, setShowReadMore] = useState(false);
  const [commentItemHeight, setCommentItemHeight] = useState(0);
  useEffect(() => {
    let _mounted = true;
    if (productId) {
      fetchProductCommentReview(productId)
    }
    if(commentsRef.current.scrollHeight > commentsRef.current.clientHeight ){          
      setShowReadMore(true);         
      setTaskHeight(commentsRef.current.scrollHeight + commentItemHeight)
     }
    return () => {
      _mounted = false;
    };
  }, [productId]);
  
  return (
    <CommentReviewsWrapper ref={commentsRef} show={show}>
      {loading ? (
        <Spinner loadChildComponent />
      ) : (
        <React.Fragment>
          <CommentsPost show={show}>
            <TextArea placeholder="Để lại bình luận của bạn tại đây" />
            <Button color="primary" variant="contained" size="small">
              Gửi
            </Button>
          </CommentsPost>          
          <CommentsGet>
            {comments.length ? comments.map((comment) => {                
                  return (
                    <CommentReviewsItem key={comment._id} comment={comment} product={product} setCommentItemHeight={value => setCommentItemHeight(value)}/>
                  );
                })
               : null }
          </CommentsGet>
        </React.Fragment>
      )}
       {showReadMore  ? <ReadMore onClick={() => setReadMore(true)}>{!readMore ? "Xem thêm" : "Thu gọn"}</ReadMore> : null} 
    </CommentReviewsWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  comments : selectComments,
  loading : selectCommentsLoading,
  error : selectCommentReviewsError,
  product : selectProductDetailData
})
const mapDispatchToProps = dispatch => ({
  fetchProductCommentReview : (productId) => dispatch(fetchProductCommentReview(productId))
})
export default connect(mapStateToProps, mapDispatchToProps)(CommentReviews);
