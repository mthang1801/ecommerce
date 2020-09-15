import styled, {keyframes} from "styled-components";

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
export const TaskbarContentWrapper = styled.div`
  width : 100%;   
  height: ${({show}) => show ? "100%" : 0} ;
  animation : ${taskbarContentAnimation} 0.25s ; 

`

export const EmbberContent = styled.div`
  width: 100%; 
  height : 90%;
  overflow : hidden ;
  text-overflow : ellipsis ; 
  line-height: 1.5;
  line-break: anywhere;
  word-wrap : break-word;
  position : ${({readMore, showReadMore}) => !showReadMore ? "unset" : readMore ?"unset" : "absolute"}
`

export const ReadMore = styled.span`
  text-align:center; 
  cursor : pointer;
  position : absolute; 
  top : 100%;
  left: 50%; 
  transform : translateX(-50%);
  color : #3f51b5;
  &:hover{
    color: #0a1b7a;
  }
`