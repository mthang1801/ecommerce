import styled from "styled-components";

export const BackdropContainer = styled.div`
  display : ${({show}) => show ? "block" : "none"};
  position : fixed ; 
  width : 100%; 
  height : 100%;  
  top : 0 ; 
  left : 0 ;
  bottom : 0; 
  right : 0;
  background-color : rgba(0,0,0,.25);
  z-index : 999;  
`
