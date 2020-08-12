import styled from "styled-components";

export const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  position : fixed; 
  top : 0; 
  left : 0 ;
  right : 0 ; 
  bottom : 0 ;
  background-color : rgba(0,0,0,0.15);
  z-index : 300;
  display : ${({show}) => show ? "block" : "none"};
`