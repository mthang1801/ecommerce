import styled from "styled-components";
import {lighten} from "polished"
export const TaskbarContainer = styled.div`
  margin : 2rem  0 ;
  width : 100%;
  display : flex ;
  flex-direction : column;
  z-index:  0;
`
export const Wrapper = styled.div`  
  position : relative ; 
  width : 100%;
  height : 1px; 
  background-color : #ccc;
  z-index: 0 ;
`

export const TasksList = styled.div`
  display : flex;  
  left : 50%; 
  top : 50%;
  transform : translate(-50%, -50%);
  width : ${props => props.mobileView ? "100%" : "50%"}; 
  position : absolute ; 
  top : 0 ;
  background-color : white;
  z-index :1;
  overflow : hidden ;
`
export const ListItem = styled.span`
  font-weight :bold ; 
  font-size : 1.2em;
  cursor: pointer;
  color : ${({active}) => active ? "black" : `${lighten("0.3", "black")}` } ;
  text-align:center;
  width : 33%;
  &:hover{
    color : black;
  }
`

export const TaskContent = styled.div`
  margin : 1rem;
  padding : 1rem;
  min-height: 200px;
  position : relative; 
`
// height: ${({readMore,taskHeight}) => readMore ? "auto" : taskHeight > 2000 ? `${taskHeight/10}px` : taskHeight > 1000 ? `${taskHeight/5}px` : taskHeight > 500 ? `${taskHeight/2}px` : "auto" };   

export  const ReadMore = styled.span`
  margin : 1rem auto;
  cursor : pointer ; 
  color : #1e88e5 ;
  &:hover{
    color : #0d47a1;
  }
  z-index : 100;
`

export  const ReadLess = styled.span`
  margin : 1rem auto;
  cursor : pointer ; 
  color : #dd2222 ;
  &:hover{
    color : ${lighten("0.1", "#dd2222")};
  }
  z-index : 100;
`