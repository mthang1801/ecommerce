import styled from "styled-components";

export const CategoryMenuContainer = styled.div`
  display : flex ; 
  flex-direction : column;  
  height : ${({show}) => show ? "100%" : 0}; 
  border : ${({show}) => show ? "1px solid #ccc" : "none"};
  transition : height 0.3s ;
  position :relative;  
`

export const Dropdown = styled.div`
  position: relative;   
`

export const DropdownContent = styled.div`


`

export const CategoryList = styled.div`  
  padding : 0 1rem;
`