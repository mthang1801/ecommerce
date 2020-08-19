import styled from "styled-components";
import NumberFormat from "react-number-format";

export const FormCreateProductWrapper = styled.div`
  margin : 5rem auto;
  width : 600px; 
`

export const CustomNumberFormat = styled(NumberFormat)`
  width : 100%;
  height : 2.5rem; 
  padding : .1rem;
  font-size : 1.1em;
  border : none ; 
  outline : none ; 
  border-bottom :1px solid #424242;
  &:focus { 
    border-bottom : 2px solid #002984;
  };  
`

export const List = styled.div`
  margin-top : ${({isDiscount}) => isDiscount ? 0 : "-2.5rem"};
  width : 100%; 
  display : flex ; 
  flex-direction : column ;    
  transition : all 0.25s;  
  margin-bottom : 4rem;
`
