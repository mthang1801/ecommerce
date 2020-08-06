import styled from "styled-components";
import {Link} from "react-router-dom";
export const PageMenuContainer = styled.div`
  position : absolute; 
  top : 100%;
  width : 12vw;
  display : flex ; 
  flex-direction : column;
  background-color : #454545;
  color : white ; 
  opacity : ${({show}) => show ? 1 : 0};
  height : ${({show}) => show ? "auto" : 0};
  visibility : ${({show}) => show ? "visible" : "hidden"};
  transition : opacity 0.25s;
  z-index:  100;
`
export const CustomLink = styled(Link)`
  padding : .5rem 1rem;
  color : white ;
  width : 100%;
  &:hover{
    color : #7fad39;
  }
  width : 100%;
  white-space: nowrap;
  overflow : hidden ; 
  text-overflow : ellipsis;
`
