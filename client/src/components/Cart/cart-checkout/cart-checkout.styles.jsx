import styled from "styled-components";

export const CartCheckoutContainer = styled.section`
  display : flex ; 
  flex-direction : ${props => props.mobileView || props.tabletView ? "column" : "row"};
  width : 90%;
  margin : auto ;  
`

export const Grid = styled.div`
  width :  ${props => props.mobileView || props.tabletView ? "100%" : "50%"};  
  margin : 1rem auto;
`