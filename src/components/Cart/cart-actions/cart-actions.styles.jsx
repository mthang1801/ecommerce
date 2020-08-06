import styled from "styled-components";
import {Link} from "react-router-dom";
import {darken} from "polished";
export const CartActionsContainer = styled.section`
  width : 100%; 
  display : flex ; 
  justify-content : space-between ;
  font-size : 1.2em;  
  margin : 3rem auto;
`

export const BtnShopping = styled(Link)`
  padding : 1rem 2rem ; 
  text-transform : uppercase ;   
  background-color: #e8e8e8; 
  text-decoration : none ;
  color : inherit ;
  &:hover{
    background-color : ${darken("0.1", "#e8e8e8")};
  }
`

export const BtnUpdate = styled.span` 
  padding : 1rem 2rem ; 
  background-color: #e8e8e8; 
  text-transform : uppercase ;  
  color : inherit ;  
  cursor : pointer; 
  &:hover{
    background-color : ${darken("0.1", "#e8e8e8")};
  };
  display : flex  ;
  align-items : center;
`