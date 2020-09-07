import styled , {keyframes} from "styled-components";
import {darken} from "polished"
const checkoutShowUp = keyframes`
  0% {
    opacity : 0; 
    transform : translateX(-100%);
  }
  100%{
    opacity : 1 ;
    transform : translateX(0);
  }
` 
export const CheckoutFormWrapper = styled.div`
  width : 100%;
  display : flex; 
  flex-direction : column ; 
`
export const Form = styled.div`
  width : 100%;
  padding : 1rem 2rem;
  border-radius : 7px; 
  border : 1.5px solid #283593;   
  z-index : 0 ; 
  animation : ${checkoutShowUp} 0.5s; 
  position : relative;  
`

export const Label = styled.div`
  position : absolute; 
  background-color : white; 
  padding : 0.15rem 0.25rem;
  top : -1rem ; 
  z-index:  1 ;
  font-size: 0.9em;
`
export const Button = styled.button`
  outline : none ; 
  border : none ; 
  color : white; 
  background-color : #283593 ; 
  cursor : pointer; 
  padding : 0.75rem 1.25rem;
  border-radius: 7px; 
  margin : 0.5rem 0;
  &:hover{
    background-color: ${darken("0.2","#283593")} ;     
  }
  animation : ${checkoutShowUp} 0.5s; 
`

export const ButtonLink = styled.span`     
  color : #283593 ; 
  cursor : pointer;    
  &:hover{   
    color : ${darken("0.2", "#283593")}; 
  }
`