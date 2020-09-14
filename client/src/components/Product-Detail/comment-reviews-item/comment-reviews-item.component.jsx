import React, { useEffect, useState, useRef } from "react";
import {
  CommentReviewsItemWrapper,
  Image,
  Row,
  ReadMore,
  CommentText, 
  ButtonLink,
} from "./comment-reviews-item.styles";
import Moment from "react-moment";
import { FcBusinessman } from "react-icons/fc";
import {connect} from "react-redux";
import {selectCurrentUser} from "../../../redux/user/user.selectors";
import {createStructuredSelector} from "reselect"
import {withRouter, Redirect} from "react-router-dom";
const CommentReviewsItem = ({ comment, product , setCommentItemHeight, currentUser, match}) => {
  const commentItemReadMore = useRef(null) 
  const [readMore, setReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [text, setText] = useState("");
  useEffect(() => {
    console.log(commentItemReadMore.current.scrollHeight, commentItemReadMore.current.clientHeight)
    if(comment.text.length > 150){
      setShowReadMore(true);
      setText(comment.text.substr(0,200)); 
      // setCommentItemHeight(commentItemReadMore.current.scrollHeight - )
    }else{
      setShowReadMore(false);
      setText(comment.text)      
    }  
  }, [comment])  
  const handleSetReadMore = () => {
    if(readMore){
      setReadMore(false);
      setText(comment.text.substr(0,200));
    }else{
      setReadMore(true)
      setText(comment.text);
    }
  }
  const handleClickLikeButton = () => {       
    if(!currentUser){
      let splitUrl = match.url.split("/");
      splitUrl[splitUrl.length -1] = encodeURI(splitUrl[splitUrl.length -1]);
      let url = splitUrl.join("/");
      console.log(url);
      return ;
    }
  }
  return (
    <CommentReviewsItemWrapper ref={commentItemReadMore}>
      <Row>
        <Image
          src={
            comment.user.avatar === "avatar-default.png"
              ? `http://localhost:5000/images/${comment.user.avatar}`
              : null
          }
        />
        <Row style={{flexDirection:"column"}}>
          <CommentText>
            <p>
              <strong>
                {comment.user.name}{" "}
                {comment.user._id === product.user._id ? (
                  <span style={{ color: "#3f51b5" }}>
                    Nhà bán hàng <FcBusinessman />
                  </span>
                ) : (
                  ""
                )}
              </strong>{" "}
              <span style={{ color: "rgba(0,0,0,0.75)" }}>
                <Moment format="DD-MM-YYYY HH:mm">{comment.updatedAt}</Moment>
              </span>{" "}
            </p>
            <p>{text} {showReadMore  ? <span>... <ReadMore onClick={handleSetReadMore}>{!readMore ? "Xem thêm" : "Thu gọn"}</ReadMore></span> : null} </p>
           
          </CommentText>       
          <div>
            <ButtonLink onClick={handleClickLikeButton}>Thích ({comment.likes.length})</ButtonLink>
            <ButtonLink>Không thích ({comment.dislikes.length})</ButtonLink>
            <ButtonLink>Trả lời</ButtonLink>
          </div>
        </Row>
      </Row>
    </CommentReviewsItemWrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser
})
export default connect(mapStateToProps)(withRouter(CommentReviewsItem));
