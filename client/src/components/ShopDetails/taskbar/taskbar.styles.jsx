import styled from "styled-components";
import {lighten} from "polished"
export const TaskbarContainer = styled.div`
  margin : ${props => props.mobileView || props.tabletView ? "2rem auto" : "4rem auto"} ;
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
`

export const TaskContentItem = styled.article`
  opacity : ${({show}) => show ? 1 : 0};
  height : ${({show}) => show ? "100%" : 0};
  transition : opacity 0.5s;
  display : flex ; 
  flex-direction : column ; 
  align-items : center;
`

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