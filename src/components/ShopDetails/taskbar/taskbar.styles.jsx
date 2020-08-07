import styled from "styled-components";
import {lighten} from "polished"
export const TaskbarContainer = styled.div`
  margin : 4rem auto;
  width : 100%;
  display : flex ;
  flex-direction : column;
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
  width : 50%; 
  position : absolute ; 
  top : 0 ;
  background-color : white;
  z-index :1;
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

export const TastContent = styled.div`
  margin : 1rem;
  padding : 1rem;
`

export const TastContentItem = styled.article`
  opacity : ${({show}) => show ? 1 : 0};
  height : ${({show}) => show ? "100%" : 0};
  transition : opacity 0.5s;
`