import styled from "styled-components";

export const NavigationItemsContainer = styled.div`
  width : 100%;
  display : flex ; 
  flex-direction : column;  
  line-height : 1.8;
`

export const ExtensionLink = styled.span` 
  cursor : pointer;
  padding : 0.5rem;
  &:hover{
    color : white;
  }  
`

export const ExtensionScope = styled.div`
  height: ${({show}) => show ? "100%" : 0};
  visibility : ${({show}) => show ? "visible": "hidden"};
  opacity : ${({show}) => show ? 1 : 0};
  width : 100%; 
  transition : all 0.3s ;
  & > *{
    padding : 0.25rem 1.5rem;
  };
  
`