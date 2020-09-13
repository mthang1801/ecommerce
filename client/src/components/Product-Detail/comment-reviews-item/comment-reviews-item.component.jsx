import React, {useEffect, useState} from 'react'
import {CommentReviewsItemWrapper, Row, Grid, Image} from "./comment-reviews-item.styles";
const CommentReviewsItem = ({comment}) => {
  const [readMore, setReadMore] = useState(false);
  useEffect(() => {}, [comment])
  console.log(comment)
  return (
    <CommentReviewsItemWrapper>
      <Row>
        <Grid width={25}>
          <Image src={`http://localhost:5000/images/${comment.user.avatar}`}/>
        </Grid>
        <Grid width={75}>
          {comment.text}
        </Grid>
      </Row>
    </CommentReviewsItemWrapper>
  )
}

export default CommentReviewsItem
