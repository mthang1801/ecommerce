import React, {useState, useEffect, useRef} from 'react'
import {TaskbarContentWrapper, EmbberContent, ReadMore} from "./task-content-item.styles";
const TaskbarContent = ({content, show, readMore, setReadMore, setTaskHeight}) => {
  const contentRef = useRef(null);
  const [text, setText] = useState(null);   
  const [showReadMore, setShowReadMore] = useState(false);
  useEffect(() => {                
    console.log(contentRef.current.scrollHeight, contentRef.current.clientHeight)
   if(contentRef.current.scrollHeight > contentRef.current.clientHeight || content.length > 200 ){
    setShowReadMore(true);        
   }
   setTaskHeight(contentRef.current.scrollHeight)
  }, [content]) ;
  
  return (
    <TaskbarContentWrapper show={show} >
      <EmbberContent dangerouslySetInnerHTML={{__html : content}} ref={contentRef} />
      {showReadMore  ? <ReadMore onClick={() => setReadMore(true)}>{!readMore ? "Xem thêm" : "Thu gọn"}</ReadMore> : null}      
    </TaskbarContentWrapper>
  )
}

export default TaskbarContent
