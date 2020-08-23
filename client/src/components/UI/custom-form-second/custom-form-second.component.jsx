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
    margin-bottom : 2.3rem;
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

export const Title = styled.h2`
  text-align : center; 
  font-weight : bold ; 
  font-size : 1.8em;
  margin : 0 auto 2rem auto;
`

export const Label = styled.label`
  position : absolute ; 
  top : -0.8rem;
  font-size : 0.85em;  
  color : #002984 ;
  left : 10px ;
  background-color : white ; 
  z-index : 1;
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
  margin-top : ${({inputFile}) => inputFile ? "0.5rem" : 0};
  z-index :  0;
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
  font-size : 0.95em;
  z-index: 0;
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
  color : #404040;
  top : 100%;
  font-size : 0.8em ;
`

export const ErrorMessage = styled.h4`
  font-weight: 600; 
  font-size : 1em;
  text-align : left ;
  color : #dd2222; 
`