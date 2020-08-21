import styled from "styled-components";

export const Form = styled.form`
  width : 100%; 
  max-width : 600px;
  margin : 1rem auto;
`
export const FormGroup = styled.div`
  display : flex ;   
  &:not(:last-child){
    margin-bottom : 2rem;
  }
  position : relative;
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
  font-size : 0.8em; 
  color : #002984;
  top : -0.8rem;
  background-color : white;
  padding : 0px 10px;
  left : 0.4rem;    
  z-index: 1;
`

export const Input = styled.input`
  width : 100%;
  height : 2.5rem; 
  padding : 1rem;
  font-size : 1.1em;
  border : none ; 
  outline : none ; 
  border :1px solid #424242;
  &:focus{
    border :  2px solid #002984;
  }
  z-index : 0 ;
`


export const Required = styled.span`
  color : #dd2222;
`

export const Select = styled.select`  
  width : 100%; 
  padding : .7rem 1rem;
  font-size : 1.1em;
  line-height : 1.7;
  outline : none ; 
  border :1px solid #424242;
  margin : 0 auto 1.5rem auto;
  z-index:  0;
`

export const Option = styled.option``

export const Editable = styled.span` 
  color : rgba(0,0,0,0.75)  ;
  cursor : pointer;
  font-size : 1.6em;
  &:hover{
    color : black;
  }
`