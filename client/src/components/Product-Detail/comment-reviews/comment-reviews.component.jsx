import React, {useEffect, useState} from 'react'
import {getCommentReviewsByProductId} from "../../../utils/connectDB";
import Spinner from "../../UI/spinner/spinner.component"
import {CommentReviewsWrapper, TextArea} from "./comment-reviews.styles";
import CommentReviewsItem from "../comment-reviews-item/comment-reviews-item.component"
const CommentReviews = ({show,productId}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);
  useEffect(() => {
    let _mounted = true ;     
    if(productId){
      setLoading(true);
      getCommentReviewsByProductId(productId).then(data => {
        if(_mounted){
          console.log(data);
          setComments(data);
          setLoading(false);
        }      
      })
      .catch(err => {
       if(_mounted){
        setError(err);
        setLoading(false);
       }
      })
    }
    
    return () => {_mounted = false}
  }, [productId])
  return (
    <CommentReviewsWrapper>
      {loading ? <Spinner loadChildComponent/> : <React.Fragment>
        <TextArea placeholder="Để lại bình luận của bạn tại đây" />
          {comments.length ? comments.map((comment) => (
            <CommentReviewsItem key={comment._id} comment={comment}/>
          )) : null}
        </React.Fragment>}
    </CommentReviewsWrapper>
  )
}

export default CommentReviews
