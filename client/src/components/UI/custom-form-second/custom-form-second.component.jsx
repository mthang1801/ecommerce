import styled from "styled-components";

export const Form = styled.form`
  width : 100%; 
  max-width : 600px;
  margin : 1.5rem auto;
`
export const FormGroup = styled.div`
  display : flex ;   
  margin : 0 0.5rem;
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
  top : -1rem;
  font-size : 0.9em;  
  color : #002984 ;
`

export const Input = styled.input`
  width : 100%;
  height : 2.5rem; 
  padding : .1rem;
  font-size : 1.1em;
  border : none ; 
  outline : none ; 
  border-bottom :1px solid #424242;
  &:focus { 
    border-bottom : 2px solid #002984;
  };
  margin-top : ${({inputFile}) => inputFile ? "0.5rem" : 0}
`


export const Required = styled.span`
  color : #dd2222;
`

export const Select = styled.select`  
  width : 100%; 
  outline : none ;
  border :1px solid #424242; 
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 10px;
  border: 1px solid #dfdfdf;
  border-radius: 2px; 
  padding: 1rem;
  padding-right: 2rem;
  font-size : 0.9em;
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

export const FormGroupAnimation = styled.div`
display : flex ;   
  &:not(:last-child){
    margin-bottom : 2rem;
  }
  position : relative;
  visibility : ${({isDiscount}) => isDiscount ? "visible" : "hidden"};
  width : ${({isDiscount}) => isDiscount ? "100%" : "50%"};
  height : ${({isDiscount}) => isDiscount ? "auto" : 0};
  transition : ${({isDiscount}) => isDiscount ? "all 0.25s" : "none"};
`

export const PlainText= styled.span`
  width : 100%; 
  overflow: hidden ;
  white-space : nowrap; 
  text-overflow : ellipsis ;
  position : absolute;   
  left : 4px;
  font-style: italic;
  color : #dd2222;
  top : 100%;
  font-size : 0.8em ;
`