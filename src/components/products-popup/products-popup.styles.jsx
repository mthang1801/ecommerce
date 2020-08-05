import styled from "styled-components";

export const ProductsPopupContainer = styled.div`
  position : absolute;  
  left : ${({offsetWidth}) => `calc(${offsetWidth}px )` };
  background-color : #fff;
  padding : 1rem 2rem;
  display : flex ;
  top : -5rem;  
  width : 1000px;
  height : 550px;
  border : 1px solid #ccc;
  z-index: 10;
`