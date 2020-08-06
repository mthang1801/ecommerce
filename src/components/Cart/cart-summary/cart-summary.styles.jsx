import styled from "styled-components";
import {darken} from "polished";
export const CartSummaryContainer = styled.div`
  width : 100%;
  display : flex ; 
  flex-direction: column ;
  padding : 1.5rem;
  background-color : #eee;
`

export const Label = styled.h3`
  font-size : 1.3em;
  font-weight : bold ; 
  margin-bottom : 1rem;
`

export const Grid = styled.div`
  display : flex ; 
  justify-content : space-between ;   
  padding : 1rem;
  font-size : 1.1em;
  border-bottom : 1px solid #ccc; 
` 
export const CartKey = styled.span`
  width : 60%; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
` 
export const CartValue = styled.span`
  width : 40%; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const CheckoutButton = styled.button`
  margin : 2rem ;
  display : block;
  outline : none ; 
  border : none ; 
  background-color : #7fad39;
  padding : 1rem 2rem;
  border-radius : 5px; 
  color : white ;
  font-size : 1.2em ; 
  text-transform : uppercase ; 
  cursor : pointer;
  &:hover { 
    background-color : ${darken("0.1", "#7fad39")};
  }
`