import styled from "styled-components";
import {Link} from "react-router-dom";
import {darken} from "polished";
export const CartActionsContainer = styled.section`
  width : 100%; 
  display : flex ; 
  justify-content : space-between ;
  align-items : center;
  font-size : ${props => props.mobileView || props.tabletView ? "1em" : "1.2em"};  
  margin : ${props => props.mobileView || props.tabletView ? "1.5rem auto" : "3rem auto"}; 
`

export const BtnShopping = styled(Link)`
  padding : ${props => props.mobileView || props.tabletView ? "0.5rem" : "1rem 1.5rem"}; 
  text-transform : uppercase ;   
  background-color: #388e3c; 
  color : white;

  text-decoration : none ;  
  &:hover{
    background-color : ${darken("0.1", "#388e3c")};
  }
`

export const BtnUpdate = styled.span` 
  padding :${props => props.mobileView || props.tabletView ? "0.5rem" : "1rem 1.5rem"}; 
  background-color: #afb42b; 
  text-transform : uppercase ;  
  color : inherit ;    
  cursor : pointer; 
  &:hover{
    background-color : ${darken("0.1", "#afb42b")};
  };
  display : flex  ;
  align-items : center;
`