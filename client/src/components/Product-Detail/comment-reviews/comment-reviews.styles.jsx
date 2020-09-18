import styled , {keyframes}  from "styled-components";
const taskbarContentAnimation = keyframes`
  0%{
    opacity: 0;
    transform : translateX(-100%);
  }
  100%{
    opacity : 1; 
    transform : translateX(0);
  }
`
export const CommentReviewsWrapper = styled.div`
  width : 100%;   
  height: 100%;
  position : relative;  
  overflow : hidden ; 
  animation : ${taskbarContentAnimation} 0.5s;
  z-index:  0 ; 
`

export const TextArea = styled.textarea`
  width : 100%; 
  height:  7rem ;  
  font-size : 1em;
  min-height: 60px; 
  padding : 0.75rem 1.25rem; 
  outline : none ; 
  border-radius: 5px; 
  border : 1.5px solid #198cf0; 
  &:focus {
    border-color :  #004a8a; 
  };
  resize : none ; 
  font-family : Roboto, sans serif;
`
export const CommentsPost = styled.form`
  width : 100%; 
  height: 35%;
  margin-bottom : 1rem
`
export const CommentsGet = styled.div`
  width : 100%; 
  height: 60%;
  display : flex; 
  flex-direction : column ; 
`

export const ReadMore = styled.div`
  position : absolute; 
  top : 100%;
`

export const ButtonReadMore = styled.button`
  outline : none ; 
  border : none ; 
  display : block ;
  cursor : pointer; 
  background-color :#3f51b5 ;
  padding : 0.75rem ; 
    width: 100%;
    color: white;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.15);
  &:hover{
    background-color : #0b1e87;
  }
`