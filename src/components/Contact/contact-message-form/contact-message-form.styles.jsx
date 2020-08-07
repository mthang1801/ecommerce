import styled from "styled-components";
import {darken} from "polished";

export const Form = styled.form`
  width : 80%; 
  padding : 2rem 3rem;
  margin : 1rem auto ;
  text-align : center;
  font-size : 1.2em;
  & > *{
    margin : 1rem auto ;
  }
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