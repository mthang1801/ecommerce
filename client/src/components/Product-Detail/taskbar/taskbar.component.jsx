import React, {useState, useEffect} from "react";
import {
  TaskbarContainer,
  Wrapper,
  TasksList,
  ListItem,
  TaskContent,
} from "./taskbar.styles";
import TaskContentItem from "../task-content-item/task-content-item.component"
import CommentReviews from "../comment-reviews/comment-reviews.component";
const Taskbar = ({mobileView, tabletView, product}) => {
  const [task, setTask] = useState("description")
  const [readMore, setReadMore] = useState(false);  
  const [showReadMore, setShowReadMore] = useState(false);  
  const [taskHeight, setTaskHeight] = useState(0);
  const handleClickListItem = taskName => {
    setReadMore(false);    
    setTask(taskName)
  }  
  return (
    <TaskbarContainer >
      <Wrapper>
        <TasksList mobileView={mobileView} tabletView={tabletView}>
          <ListItem active={task==="description"} onClick={() => handleClickListItem("description")} >Mô tả</ListItem>
          <ListItem active={task==="information"} onClick={() => handleClickListItem("information")}>Thông tin chi tiết</ListItem>
          <ListItem active={task==="reviews"} onClick={() => handleClickListItem("reviews")}>Đánh giá (2)</ListItem>
        </TasksList>
      </Wrapper>
      <TaskContent readMore={readMore} taskHeight={taskHeight}>
        {task=== "description" ? <TaskContentItem show={task==="description"} content={product.description} readMore={readMore} setReadMore={() =>setReadMore(!readMore)} showReadMore={showReadMore} setShowReadMore={() => setShowReadMore(!showReadMore)} setTaskHeight={value => setTaskHeight(value)}/> : null}          
        {task=== "information" ? <TaskContentItem show={task==="information"} content={product.information} readMore={readMore} setReadMore={() =>setReadMore(!readMore)} showReadMore={showReadMore} setShowReadMore={() => setShowReadMore(!showReadMore)} setTaskHeight={value => setTaskHeight(value)}/> : null}          
        {task=== "reviews" ? <CommentReviews  show={task==="reviews"} productId={product._id} /> : null}
       
      </TaskContent>
    </TaskbarContainer>
  );
};

export default Taskbar;
