import styled from "styled-components";

export const Wrapper = styled.div`
  width : 100%;
  display : flex ; 
  align-items : center;
  cursor : pointer;   
  position :relative; 
  box-shadow : var(--lightShadow);
`

export const Text = styled.span`
  margin-right : 0.5rem;
`

export const LanguageDropdownContainer = styled.div`
  position : absolute ; 
  top : -10%;
  right: 110%;  
  width : 100%;  
  background-color : var(--color-background-dark); 
  color : var(--color-text-dark) ;
  display : flex ; 
  flex-direction : column;
  opacity : ${({show}) => show ? 1 : 0 };
  z-index : 400;
  visibility : ${({show}) => show ? "visible" : "hidden"};
  transition : all 0.25s;
  box-shadow: var(--lightShadow);

`

export const RowInline = styled.div`
  display : flex ; 
  align-items : center;    
  padding : .25rem 1rem;
  &:not(:last-child){
    border-bottom : 1px solid #7fad39;
  }
  &:hover{
    background-color : #7fad39;
    color : white;
  }
`