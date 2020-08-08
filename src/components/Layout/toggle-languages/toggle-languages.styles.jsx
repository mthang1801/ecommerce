import styled from "styled-components";

export const ToggleLanguageContainer = styled.div`
  width : 100%;
  display : flex ; 
  align-items : center;
  cursor : pointer;   
  position :relative; 
`

export const Text = styled.span`
  margin-right : 0.5rem;
`

export const LanguageList = styled.div`
  position : absolute ; 
  top : 100%; 
  width : 100%;  
  background-color : #424242; 
  color : white ;
  display : flex ; 
  flex-direction : column;
  opacity : ${({show}) => show ? 1 : 0 };
  z-index : 400;
  visibility : ${({show}) => show ? "visible" : "hidden"};
  transition : all 0.25s;

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