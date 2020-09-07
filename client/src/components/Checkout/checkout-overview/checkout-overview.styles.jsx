import styled from "styled-components";

export const CheckoutOverviewContainer = styled.div`
  width: 95%;
  margin : 3rem auto;
  display : flex;  
  justify-content : space-between;
`

export const Title = styled.h2`
  font-weight : bold ;
  font-size : 1.7em;
  margin-bottom: 1rem;
`
export const CheckoutPreview = styled.div`
  width: 100%;
  display : flex ; 
  justify-content : ${props => props.mobileView || props.tabletView ? "center" : "space-between"};
  flex-direction : ${props => props.mobileView || props.tabletView ? "column" : "row"};
  
`
export const Grid = styled.div`
  width : ${props => props.mobileView || props.tabletView ? "100%" :  props.w60 ? "58%" : "40%" } ;
  margin-bottom : ${props => props.mobileView || props.tabletView ? "2rem" : 0};
`