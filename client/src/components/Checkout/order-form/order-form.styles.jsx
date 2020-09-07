import styled , {keyframes} from "styled-components";
import {darken} from "polished";
const OrderFormAnimation = keyframes`
0% {
  opacity : 0; 
  transform : translateX(100%);
}
100%{
  opacity : 1 ;
  transform : translateX(0);
}
`
export const OrderFormContainer = styled.div`
  width : 100%;
  display : flex ; 
  flex-direction : column;
  padding : 1.25rem;
  background-color : #f5f5f5;
  animation : ${OrderFormAnimation} 0.5s;
`
export const Title = styled.h3`
  font-weight : bold ; 
  font-size : 1.3em;
`
export const OrderList = styled.div`
  width : 100%;
  display : flex ; 
  flex-direction : column;
  
  border-bottom :1px solid #ccc;
`
export const Row = styled.div`
  display : flex ; 
  justify-content : space-between;
  padding : .5rem ;
`
export const Grid = styled.div` 
  &:first-child{
    width: 70%;
  };  
  overflow : hidden ;
`
export const Strong = styled.span`
  font-size : 1.2em;
  font-weight : bold ; 
  color : ${(props) => props.price ? "#6f6f6f" : props.total ? "#dd2222" : "inherit"}
`

export const Paragraph = styled.p`
  padding : 1rem;
`
export const CheckoutBtn = styled.button`
  outline : none ; 
  border : none ; 
  cursor : pointer; 
  text-transform : uppercase ; 
  font-size : 1.3em;
  font-weight : bold ; 
  border-radius : 5px ;
  padding : .75rem 1rem ;
  color : white ; 
  background-color : #7fad39;
  &:hover{
    background-color :  ${darken("0.1", "#7fad39")};
  }
`