import styled from "styled-components";

export const CartCheckoutContainer = styled.section`
  display : flex ; 
  flex-direction : ${props => props.mobileView || props.tabletView ? "column" : "row"};
  width : 95%;
  margin : auto ;  
  flex-direction : column ; 
`

export const Grid = styled.div`
  width :  100%;  
  margin : 1rem auto;
`