import styled from "styled-components";

export const ProductsPopupContainer = styled.div`
  position : absolute;  
  left : ${({offsetWidth}) => `calc(${offsetWidth}px )` };
  background-color : #fff;
  padding : 1rem 2rem;
  display : flex ;
  top : -6rem;  
  width :70vw;
  height : 85vh;
  border : 1px solid #ccc;
  z-index: 10;
  box-shadow : 0 3px 5px rgba(0,0,0,0.15)
`