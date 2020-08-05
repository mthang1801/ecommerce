import styled from "styled-components";

export const CategoryMenuContainer = styled.div`
  display : flex ; 
  flex-direction : column; 
  width : 100%;
  height : 500px; 
  border : 1px solid #ccc;
  transition : height 0.3s ;
  position :absolute;  
  z-index : 500;
  bottom :0;
  background-color : white;
  top : calc(100%);
`

export const Dropdown = styled.div`
  position: relative;   
`

export const DropdownContent = styled.div``

export const CategoryList = styled.div`  
  padding : 0 1rem;
  display : flex ;
  flex-direction : column;
  line-height : 1.5;
`