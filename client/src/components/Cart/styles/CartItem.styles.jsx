import styled from "styled-components";

export const CartItemContainer = styled.div`
  width : 100%;   
  height : 80px;
  display : flex ;   
  justify-content : flex-start;
  margin : .5rem 0;
`

export const CartItemImageContainer = styled.img`
  width : 50px;
  height : 70px;  
  margin-right : 10px;
`

export const CartItemContent = styled.div`
  display : flex ; 
  flex-direction : column;
  justify-content : space-between;

`
export const CartTotalPrice = styled.div`
  font-weight: bold; 
  font-size: 0.9em;
`

export const CartItemName = styled.div`
  font-weight : 600; 
  font-size : .9em;  
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; 
`
export const CartItemPrice = styled.div`
font-size : .8em;
`
