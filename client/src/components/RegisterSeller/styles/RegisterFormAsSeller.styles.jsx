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
  outline : none ; 
  border :1px solid #424242;
  border-radius : 0.3rem;
  &:focus{
    border :  2px solid #002984;
  }
  z-index : 0 ;
`


export const Required = styled.span`
  color : #dd2222;
`

export const Select = styled.div`  
  width : 100%; 
  padding : 0.5rem 1rem;
  font-size : 1.1em;
  line-height : 1.7;
  outline : none ; 
  border :1px solid #424242;
  border-radius : 0.3rem;
  margin : 0 auto 1rem auto;
  background-color : transparent;
  z-index:  0;
  display :flex;
  justify-content : space-between;
  align-items: center;
  cursor: pointer;
  position :relative;  
`

export const SelectIcon = styled.span`
  font-size : 0.8rem;
  opacity : 0.4;
  display : flex;
  &:hover{
    opacity : 0.8;
  }
`

export const ListAPI = styled.div`
  position : absolute;
  top : 110%;
  left : 0; 
  display : ${({show}) => show ? "flex" : "none"};
  padding:0 0.5rem;
  font-size : 0.9rem;
  flex-direction : column;
  width : 100%;
  max-height: 15rem;
  overflow : auto;
  background-color : white;
  border : 1px solid var(--color-border-default);
  border-top : none;
  box-shadow : var(--mediumShadow);
  border-radius : 0.3rem;
  z-index:  9;  
`

export const ItemAPI = styled.span`
  &:hover{
    background-color : var(--color-background-default);
  }
`

export const Placeholder = styled.span`
  opacity : 0.4; 
  font-size : 0.9rem;
`

export const Option = styled.option``

export const Editable = styled.span` 
  color : rgba(0,0,0,0.75)  ;
  cursor : pointer;
  font-size : 1.4em;
  margin-top: 0.4rem;
  &:hover{
    color : black;
  }
`