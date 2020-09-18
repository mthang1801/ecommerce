import React, { useEffect, useState, useRef } from "react";
import {
  CommentReviewsItemWrapper,
  Avatar,
  Row,
  ReadMore,
  CommentText,
  ButtonLink,
  TextArea,
  ResponseComment,
  ResponseWrapper,
} from "./comment-reviews-item.styles";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import { FcBusinessman } from "react-icons/fc";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { selectCommentResponses } from "../../../redux/product-comment-review/product-comment-review.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter, Redirect, Link } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import {
  postLikeOrUnlikeComment,
  postDislikeOrUndislikeComment,
  postResponseComment,
  postLikeOrUnlikeResponseComment,
  postDislikeOrUndislikeResponseComment,
  postResponseToResponseComment,
  getReadMoreResponses
} from "../../../redux/product-comment-review/product-comment-review.actions";
import ResponseItem from "../response-item/response-item.component";
const CommentReviewsItem = ({
  comment,
  product,
  currentUser,
  match,
  history,
  postLikeOrUnlikeComment,
  postDislikeOrUndislikeComment,
  postResponseComment,
  responses,
  postLikeOrUnlikeResponseComment,
  postDislikeOrUndislikeResponseComment,
  postResponseToResponseComment,
  getReadMoreResponses
}) => {
  const commentItemReadMore = useRef(null);
  const responseRef = useRef(null);
  const commentResponseRef = useRef(null);
  const [readMore, setReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [text, setText] = useState("");
  const [isResponseComment, setIsReponseComment] = useState(false);
  const commentDefault = comment.user.local ? comment.user.local.name :
  comment.user.google ? comment.user.google.name :
  comment.user.facebook ? comment.user.facebook.name + ", ": "";
  const [responseComment, setResponseComment] = useState(
    `${commentDefault}, `
  );
  const [responseList, setResponseList] = useState([]);
  const timeShowResponse = 700;
  useEffect(() => {    
    setResponseList(
      responses.filter((response) => response.comment == comment._id)
    );
  },[responses]);
  useEffect(() => {
    if (comment.text.length > 200) {
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
    postLikeOrUnlikeComment(comment._id, currentUser._id);
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
    postDislikeOrUndislikeComment(comment._id, currentUser._id);
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
    setTimeout(() => {
      responseRef.current.focus();
      responseRef.current.setSelectionRange(
        responseRef.current.value.length,
        responseRef.current.value.length
      );
    }, timeShowResponse);
  };
  const handleSubmitResponseComment = (e) => {
    e.preventDefault();
    if (!responseComment) {
      return;
    }
    postResponseComment(comment._id, responseComment);
    setIsReponseComment(false);
    setResponseComment(commentDefault)
  };
  const handleClickLikeResponseButton = (responseId) => {
    if (!currentUser) {
      let splitUrl = match.url.split("/");
      splitUrl[splitUrl.length - 1] = encodeURIComponent(
        splitUrl[splitUrl.length - 1]
      );
      const encodeUrl = splitUrl.join("/");
      return history.push({ pathname: "/auth", state: { from: encodeUrl } });
    }  
    postLikeOrUnlikeResponseComment(responseId , currentUser._id ) 
  };
  const handleClickDislikeReponseButton = (responseId) => {
    if (!currentUser) {
      let splitUrl = match.url.split("/");
      splitUrl[splitUrl.length - 1] = encodeURIComponent(
        splitUrl[splitUrl.length - 1]
      );
      const encodeUrl = splitUrl.join("/");
      return history.push({ pathname: "/auth", state: { from: encodeUrl } });
    }   
    postDislikeOrUndislikeResponseComment(responseId, currentUser._id)
  };
  const handleSubmitResponseToResponseComment = text => {
    if(!text){
      return ; 
    }
    postResponseToResponseComment(comment._id, currentUser._id , text)
  }

  const readMoreResponses = e => {
    getReadMoreResponses(comment._id, responseList.length)
  }

  return (
    <CommentReviewsItemWrapper ref={commentItemReadMore}>
      <Row>
        <Avatar
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
                <Moment format="DD-MM-YYYY HH:mm">{comment.createdAt}</Moment>
              </span>{" "}
            </p>
            <p>
              {text}{" "}
              {showReadMore ? (
                <span>
                  {!readMore ? "..." : " "}
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
            {(currentUser && currentUser._id !== comment.user._id) ||
            !currentUser ? (
              <ButtonLink onClick={handleClickResponseCommentButton}>
                Trả lời
              </ButtonLink>
            ) : null}
          </div>
          {isResponseComment ? (
            <ResponseComment>
              <TextArea
                timeShowResponse={timeShowResponse}
                ref={responseRef}
                value={responseComment}
                onChange={(e) => setResponseComment(e.target.value)}
              />
              <Button
                color="primary"
                variant="contained"
                style={{ margin: "10px 0" }}
                size="small"
                onClick={handleSubmitResponseComment}
              >
                Gửi bình luận
              </Button>
            </ResponseComment>
          ) : null}
          <ResponseWrapper ref={commentResponseRef}>
            {responseList.length
              ? responseList.map((response) => (
                  <ResponseItem
                    key={response._id}
                    product={product}
                    response={response}                    
                    comment={comment}
                    currentUser={currentUser}
                    handleClickLikeResponseButton={(responseId) => handleClickLikeResponseButton(responseId)}
                    handleClickDislikeReponseButton={(responseId) => handleClickDislikeReponseButton(responseId)}
                    handleSubmitResponseToResponseComment={(text) => handleSubmitResponseToResponseComment(text)}
                  />
                ))
              : null}
            {responseList.length < comment.countCommentResponses ? <ReadMore onClick={readMoreResponses}>Xem thêm phản hồi</ReadMore> : null}
          </ResponseWrapper>
        </Row>
      </Row>
    </CommentReviewsItemWrapper>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  responses: selectCommentResponses,
});
const mapDispatchToProps = (dispatch) => ({
  postDislikeOrUndislikeComment: (commentId, userId) =>
    dispatch(postDislikeOrUndislikeComment(commentId, userId)),
  postLikeOrUnlikeComment: (commentId, userId) =>
    dispatch(postLikeOrUnlikeComment(commentId, userId)),
  postResponseComment: (commentId, text) =>
    dispatch(postResponseComment(commentId, text)),
    postLikeOrUnlikeResponseComment : (responseId, userId) => dispatch(postLikeOrUnlikeResponseComment(responseId, userId)),
    postDislikeOrUndislikeResponseComment : (responseId, userId) => dispatch(postDislikeOrUndislikeResponseComment(responseId, userId)),
    postResponseToResponseComment : (commentId, userId, text) => dispatch(postResponseToResponseComment(commentId, userId, text)),
    getReadMoreResponses : (commentId, skip) => dispatch(getReadMoreResponses(commentId, skip))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommentReviewsItem));
