import styled from "styled-components";
import {Link} from "react-router-dom";
export const CustomLink = styled.span`
  cursor : pointer;  
  background-color : ${({active}) => active ? "#7fad39" : "inherit"};
  color : ${({active}) => active ? "white" : "inherit"};
  padding: 0.5rem 1rem;
  &:hover{
    background-color : #7fad39;
    color : white ; 
  }
`