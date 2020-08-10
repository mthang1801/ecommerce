import styled from "styled-components";
import {darken} from "polished";
export const IconContainer = styled.span`    
  position :relative; 
  color :  ${({color}) => color ? color : "black"} ;
  &:hover{
    color : ${({color}) => color ? darken(0.1, `${color.trim().toString()}`) : "black"}
  }
`

export const  NumberContainer = styled.div`
  position : absolute; 
  background-color: rgb(127, 173, 57);
  width : .9rem;
  height : .9rem;
  border-radius : 50%;
  top: 0;
  right : -0.65rem;
  display : flex ; 
  justify-content: center;
  align-items : center;
`
export const Number = styled.div` 
  font-size : .5em;
`
