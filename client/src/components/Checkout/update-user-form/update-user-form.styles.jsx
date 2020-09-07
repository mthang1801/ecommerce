import styled, {keyframes} from "styled-components";
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
export const Form = styled.form`
  width : 600px; 
  margin: 2rem;
  animation : ${checkoutShowUp} 0.5s; 
  @media screen and (max-width: 768px){
    width : 90%; 
    margin: auto;
  }
`
export const FormGroup = styled.div`
  display : flex ; 
  flex-direction: column ; 
  &:not(:last-child){
    margin-bottom : 2rem;
  }
  position : relative;
  z-index:  0 ;
  height : 2.5rem;
`

export const FormInline = styled.div`
  display : flex ;   
  justify-content : space-between;  
  & ${FormGroup} {
    width : 48%;
  }
`

export const Label = styled.label`
  position : absolute ; 
  top : 0;
  z-index: 1; 
  font-size: 0.85em;
  background-color : white; 
  padding : 0.1rem 0.2rem;
  left: 1rem;
  top: -0.7rem;
`

export const Input = styled.input`
  width : 100%;
  height : 100%; 
  padding : 1rem;
  font-size : 1em;
  border : none ; 
  outline : none ; 
  border :1.25px solid #283593;
  border-radius : 7px; 
`


export const Required = styled.span`
  color : #dd2222;
`

export const Button = styled.button`
  outline : none ; 
  border : none ; 
  background-color : #283593;   
  color : white ; 
  cursor : pointer; 
  padding : 0.75rem 1.25rem;
  border-radius: 7px; 
  margin : 0.5rem 0;
  &:hover{
    background-color: ${darken("0.15", "#283593")} ;   
    color : white; 
  };
  &:disabled {
    background-color : #ddd; 
    cursor : not-allowed; 
  }
`

export const Title = styled.h2`
  font-size: 2em; 
  font-weight: bold; 
  text-align: center;
`