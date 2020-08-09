import styled from "styled-components";

export const ProductsGridContainer = styled.div`
  display : grid; 
  grid-template-columns : ${(props) => props.mobileView  ? "1fr" : props.tabletView ? "1fr 1fr" : "repeat(3,1fr)"};
  grid-gap : .2rem;
`