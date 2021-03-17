import styled from "styled-components";
import {darken} from "polished";
export const IconContainer = styled.span`    
  position :relative; 
  display : inline-block; 
  & svg{
    transform : scale(1.5);
  }
  color :  ${({color}) => color ? color : "black"} ;
  &:hover{
    color : ${({color}) => color ? darken(0.1, `${color.trim().toString()}`) : "black"}
  }
`

export const  NumberContainer = styled.div`
  position : absolute; 
  background-color: rgb(127, 173, 57);
  width : 1.1rem;
  height : 1.1rem;
  border-radius : 50%;
  top: -20%;
  right : -100%;
  color : white;
  display : flex ; 
  justify-content: center;
  align-items : center;
`
export const Number = styled.div` 
  font-size : 0.7rem;
  font-weight: bolder;
`
