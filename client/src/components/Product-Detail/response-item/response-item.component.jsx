import React, { useState, useEffect, useRef } from "react";
import {
  ResponseItemWrapper,
  Avatar,
  Row,
  ResponseText,
  ReadMore,
  ButtonLink,
  ResponseComment,
  TextArea
} from "./response-item.styles";
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import { FcBusinessman } from "react-icons/fc";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { withRouter, Redirect, Link } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import {
  postLikeOrUnlikeResponseComment
} from "../../../redux/product-comment-review/product-comment-review.actions";

const ResponseItem = ({
  comment,
  product,
  response,
  currentUser,
  postLikeOrUnlikeResponseComment,
  match,
  history,
  postResponseComment,
  handleClickLikeResponseButton,
  handleClickDislikeReponseButton,
  handleSubmitResponseToResponseComment
}) => {
  const responseRef = useRef(null);
  const [text, setText] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const [isResponseComment, setIsReponseComment] = useState(false);
  const defaultResponseComment = response.user.local ? response.user.local.name :
    response.user.google ? response.user.google.name :
    response.user.facebook ? response.user.facebook.name + ", ": "";
  const [responseComment, setResponseComment] = useState(defaultResponseComment);
  const timeShowResponse = 700 ; 
  useEffect(() => {
    if (response.text.length > 200) {
      setShowReadMore(true);
      setText(response.text.substr(0, 200));
    } else {
      setShowReadMore(false);
      setText(response.text);
    }
  }, [response]);  
  const handleSetReadMore = () => {
    if (readMore) {
      setReadMore(false);
      setText(response.text.substr(0, 200));
    } else {
      setReadMore(true);
      setText(response.text);
    }
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

  return (
    <ResponseItemWrapper>
      <Row>
        <Avatar src={`http://localhost:5000/images/${response.user.avatar}`} />
        <Row style={{ flexDirection: "column" }}>
          <ResponseText>
            <p>
              <strong>
              {(response.user.local ? response.user.local.name :
                response.user.google ?  response.user.google.name :
                response.user.facebook ? response.user.facebook.name : "")}{" "}
                {response.user._id === product.user._id ? (
                  <span style={{ color: "#3f51b5" }}>
                    Nhà bán hàng <FcBusinessman />
                  </span>
                ) : (
                  ""
                )}
              </strong>{" "}
              <span style={{ color: "rgba(0,0,0,0.75)" }}>
                <Moment format="DD-MM-YYYY HH:mm">{response.createdAt}</Moment>
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
          </ResponseText>
          <div>
            <ButtonLink onClick={() => handleClickLikeResponseButton(response._id)}>
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                <AiOutlineLike />
              </span>{" "}
              ({response.likes.length})
            </ButtonLink>
            <ButtonLink onClick={() => handleClickDislikeReponseButton(response._id)}>
              <span style={{ fontSize: "1em", verticalAlign: "middle" }}>
                <AiOutlineDislike />
              </span>{" "}
              ({response.dislikes.length})
            </ButtonLink>
            {(currentUser && currentUser._id !== response.user._id) ||
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
                onClick={() => {
                  handleSubmitResponseToResponseComment(responseComment)
                  setIsReponseComment(false);
                  setResponseComment(defaultResponseComment);
                }
              }
              >
                Gửi bình luận
              </Button>
            </ResponseComment>
          ) : null}
        </Row>
      </Row>
    </ResponseItemWrapper>
  );
};

export default ResponseItem;
