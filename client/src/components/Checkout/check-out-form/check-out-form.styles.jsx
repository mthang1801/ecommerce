import styled , {keyframes} from "styled-components";
const checkoutShowUp = keyframes`
  0% {
    opacity : 0; 
    transform : translateX(-100%);
  }
  100%{
    opacity : 1 ;
    transform : translateX(0);
  }
` 
const checkoutHidden = keyframes`
  0% {
    opacity : 0; 
    transform : translateX(0);
  }
  100%{
    opacity : 1 ;
    transform : translateX(100%);
  }
` 
export const CheckoutFormWrapper = styled.div`
  width : 100%;
  padding : 1rem;
  border-radius : 7px; 
  border : 1.5px solid #283593;   
  z-index : 0 ; 
  animation : ${checkoutShowUp} 0.5s; 
`

export const Title = styled.div`
  position : absolute; 
  background-color : white; 
  padding : 0.15rem 0.25rem;
  top : 0 ; 
  z-index:  1 ;
`
export const Button = styled.button`
  outline : none ; 
  border : none ; 
  background-color : white; 
  border : 1.5px solid #283593; 
  color : #283593 ; 
  cursor : pointer; 
  padding : 0.5rem 1rem;
  border-radius: 7px; 
  margin : 0.5rem 0;
  &:hover{
    background-color: #283593 ; 
    border-color : #283593;
    color : white; 
  }
`