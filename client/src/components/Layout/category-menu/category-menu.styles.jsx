import styled from "styled-components";

export const CategoryMenuContainer = styled.div`
  display : flex ; 
  flex-direction : column;   
  width : 100%;
  height : 33rem; 
  border : 1px solid #ccc;
  transition : height 0.3s ;
  position :absolute;  
  z-index : 1500;
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

export const CustomLink = styled.span`
  cursor : pointer;  
  background-color : ${({active}) => active ? "#7fad39" : "inherit"};
  color : ${({active}) => active ? "white" : "inherit"};
  padding: 0.5rem 1rem;
  &:hover{
    background-color : #7fad39;
    color : white ; 
  }
`