import styled from "styled-components";

export const ProductsPopupContainer = styled.div`
  position : absolute;  
  left : ${({offsetWidth}) => `calc(${offsetWidth}px )` };
  background-color : #fff;
  padding : 1rem 2rem;
  display : flex ;
  flex-wrap : wrap ; 
  align-content : flex-start; 
  top : 0;   
  width :70vw;
  height: 100%; 
  border : 1px solid #ccc;
  z-index: 10;
  box-shadow : 0 3px 5px rgba(0,0,0,0.15);  
  &> *{
    width : 25%;   
    height : 300px ;  
  }
`