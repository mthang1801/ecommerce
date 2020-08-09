import styled from "styled-components";
import {darken} from "polished";

export const Form = styled.form`
  width : ${props => props.mobileView ? "100%" : props.tabletView ? "85%" : "70%"}; 
  padding : ${props => props.mobileView ? "1rem" : props.tabletView ? "1rem 1.5rem" : "2rem 3rem"};
  margin : ${props => props.mobileView ? "0" : props.tabletView ? "0.75rem auto" : "1rem auto"};  ;
  text-align : center;
  font-size : ${props => props.mobileView || props.tabletView  ? "1em" : "1.2em"}; 
  & > *{
    margin : 1rem auto ;
  }
  overflow : hidden;
`
export const Title = styled.h2`
  font-size : 1.5em ;
  font-weight : bold ; 
  text-transform : uppercase ; 
`
export const FormInline = styled.div`
  display : flex ; 
  justify-content : space-between; 
  & > * {
    width : 45%;
  }
`
export const Input = styled.input`
  height : 2.5rem;
  padding : 1rem ;   
`
export const BtnSend = styled.button`
  outline : none ; 
  border: none ; 
  color : white ; 
  background-color : #7fad39; 
  padding : 1rem 2rem;
  text-transform : uppercase ; 
  &:hover{
    background-color : ${darken("0.1", "#7fad39")};
  }
`


export const TextArea = styled.textarea`
  width  :100%;  
  padding : 1rem;  
`