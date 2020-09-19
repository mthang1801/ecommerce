import styled from "styled-components";

export const CategoryMenuContainer = styled.div`
  display : flex ; 
  flex-direction : column;   
  width : 100%;
  height : 33rem; 
  border : 1px solid #ccc;
  transition : height 0.3s ;
  position :absolute;  
  bottom :0;
  left: 0 ;
  background-color : white;
  top : calc(100%);
  color : black;
  text-align : left ;
  z-index: 1100;   
`

export const Dropdown = styled.div`
  position: relative;   
`

export const DropdownContent = styled.div`
  
`

export const CategoryList = styled.div`  
  display : flex ;
  flex-direction : column;
  line-height : 1.5;
  z-index: 1100;
  height: 100%;
  overflow : auto;
`

