import React, { useEffect, useState, useRef } from "react";
import {
  CommentReviewsItemWrapper,
  Image,
  Row,
  ReadMore,
  CommentText,
  ButtonLink,
  TextArea,
  ResponseComment
} from "./comment-reviews-item.styles";
import Moment from "react-moment";
import Button from "@material-ui/core/Button"
import { FcBusinessman } from "react-icons/fc";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter, Redirect, Link } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import {postLikeOrUnlikeComment, postDislikeOrUnDislikeComment} from "../../../utils/connectDB"
import { setLikeForComment, setUnlikeForComment, setDislikeForComment, setUndislikeForComment} from "../../../redux/product-comment-review/product-comment-review.actions"
const CommentReviewsItem = ({
  comment,
  product,
  setCommentItemHeight,
  currentUser,
  match,
  history,
  setLikeForComment,
  setUnlikeForComment,
  setDislikeForComment,
  setUndislikeForComment
}) => {
  const commentItemReadMore = useRef(null);
  const responseRef = useRef(null);
  const [readMore, setReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [text, setText] = useState("");
  const [isResponseComment, setIsReponseComment] = useState(false);
  const [responseComment, setResponseComment] = useState(`${comment.user.name}, `);
  const timeShowResponse = 700 ; 
  useEffect(() => {
    console.log(
      commentItemReadMore.current.scrollHeight,
      commentItemReadMore.current.clientHeight
    );
    if (comment.text.length > 150) {
      setShowReadMore(true);
      setText(comment.text.substr(0, 200));    
    } else {
      setShowReadMore(false);
      setText(comment.text);
    }
  }, [comment]); 
  const handleSetReadMore = () => {
    if (readMore) {
      setReadMore(false);
      setText(comment.text.substr(0, 200));
    } else {
      setReadMore(true);
      setText(comment.text);
    }
  };
  const handleClickLikeButton = () => {
    if (!currentUser) {
      let splitUrl = match.url.split("/");
      splitUrl[splitUrl.length - 1] = encodeURIComponent(
        splitUrl[splitUrl.length - 1]
      );
      const encodeUrl = splitUrl.join("/");
      return history.push({ pathname: "/auth", state: { from: encodeUrl } });
    }
    postLikeOrUnlikeComment(comment._id)
      .then((msg) => {
        if(msg == "like success"){
          setLikeForComment(comment._id, currentUser._id)
        }else{
          setUnlikeForComment(comment._id, currentUser._id)
        }
      })
      .catch((err) => console.log(err));
  };
  const handleClickDislikeButton = () => {
    if (!currentUser) {
      let splitUrl = match.url.split("/");
      splitUrl[splitUrl.length - 1] = encodeURIComponent(
        splitUrl[splitUrl.length - 1]
      );
      const encodeUrl = splitUrl.join("/");
      return history.push({ pathname: "/auth", state: { from: encodeUrl } });
    }
    postDislikeOrUnDislikeComment(comment._id)
      .then((msg) => {
        if(msg == "dislike success"){
          setDislikeForComment(comment._id, currentUser._id)
        }else{
          setUndislikeForComment(comment._id, currentUser._id)
        }
      })
      .catch((err) => console.log(err));
  };
  const handleClickResponseCommentButton = () => {
    if (!currentUser) {
      let splitUrl = match.url.split("/");
      splitUrl[splitUrl.length - 1] = encodeURIComponent(
        splitUrl[splitUrl.length - 1]
      );
      const encodeUrl = splitUrl.join("/");
      return history.push({ pathname: "/auth", state: { from: encodeUrl } });
    }
    setIsReponseComment(true);   
    setTimeout(()=> {
      responseRef.current.focus();    
      responseRef.current.setSelectionRange(responseRef.current.value.length,responseRef.current.value.length);
    }, timeShowResponse)     
  }
  const handleSubmitResponseComment = (e) => {
    e.preventDefault(); 
    if(!responseComment){
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
        <Row style={{ flexDirection: "column" }}>
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
            <p>
              {text}{" "}
              {showReadMore ? (
                <span>
                  {!readMore ? "..." : " " }
                  <ReadMore onClick={handleSetReadMore}>
                    {!readMore ? "Xem thêm" : "Thu gọn"}
                  </ReadMore>
                </span>
              ) : null}{" "}
            </p>
          </CommentText>
          <div>
            <ButtonLink onClick={handleClickLikeButton}>
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                <AiOutlineLike />
              </span>{" "}
              ({comment.likes.length})
            </ButtonLink>
            <ButtonLink onClick={handleClickDislikeButton}>
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                <AiOutlineDislike />
              </span>{" "}
              ({comment.dislikes.length})
            </ButtonLink>
            {currentUser && currentUser._id !== comment.user._id || !currentUser ? <ButtonLink onClick={handleClickResponseCommentButton}>Trả lời</ButtonLink> :  null}
          </div>
          {isResponseComment ? 
          <ResponseComment onSubmit={handleSubmitResponseComment}>
            <TextArea timeShowResponse={timeShowResponse}  ref={responseRef} value={responseComment} onChange={e => setResponseComment(e.target.value)}/> 
            <Button color="primary" variant="contained" style={{margin : "10px 0"}} size="small">Gửi bình luận</Button>
          </ResponseComment>: null}
        </Row>        
      </Row>
     
    </CommentReviewsItemWrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = dispatch => ({
  setLikeForComment : (commentId, userId) => dispatch(setLikeForComment(commentId, userId)),
  setUnlikeForComment : (commentId, userId) => dispatch(setUnlikeForComment(commentId, userId)),
  setDislikeForComment : (commentId, userId) => dispatch(setDislikeForComment(commentId, userId)),
  setUndislikeForComment : (commentId, userId) => dispatch(setUndislikeForComment(commentId, userId)),
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentReviewsItem));
