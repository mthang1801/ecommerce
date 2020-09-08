import styled , {keyframes} from "styled-components";
import { darken } from "polished";
const checkoutPayment = keyframes`
  0% {
    opacity : 0; 
    transform : translateX(-100%);
  }
  100%{
    opacity : 1 ;
    transform : translateX(0);
  }
` 
export const CheckoutPaymentWrapper = styled.div`
  width: 100%; 
  margin : 2rem auto;
  animation : ${checkoutPayment} 0.5s;   
`;

export const FormGroup = styled.div`
  width : 100%;
  position : relative;
  margin: 2rem auto;
`

export const Select = styled.select`
  width: 100%;
  font-size: 1em;
  border: none;
  outline: none;
  border: 1.5px solid #283593;
  border-radius : 7px; 
  padding : 0.5rem 0.8rem;
  background-color : white;
  @media screen and (max-width:768px){
    padding : 0.75rem 1rem;
  }
`;

export const Option = styled.option``;
export const Label = styled.span`
font-size: 0.9em;
position: absolute;
background-color: white;
padding: 0 0.25rem;
top: -30%;
left : 1rem;
z-index: 1;
`
export const Button = styled.button`
  display : block;
  outline: none;
  border: none;
  color: white;
  background-color: #283593;
  cursor: pointer;
  padding: 0.75rem 1.25rem;
  border-radius: 7px;
  margin: 1rem auto;
  &:hover {
    background-color: ${darken("0.2", "#283593")};
  }
`;


export const CheckoutEmpty = styled.div`
  width : 100%; 
  display : flex;
  justify-content : center;
`