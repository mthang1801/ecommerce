import styled from "styled-components";

export const ProductsContainer = styled.div`
  width : 100%; 
  display : grid; 
  grid-template-columns: ${({mobileView,tabletView}) => mobileView ? "100%" : tabletView ? "50% 50%" : "repeat(3, 33%)" } ;    
  grid-gap : .2rem;  
`
