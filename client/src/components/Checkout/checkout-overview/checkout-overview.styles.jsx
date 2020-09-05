import styled from "styled-components";

export const CheckoutOverviewContainer = styled.div`
  width: 90%;
  margin : 3rem auto;
`

export const Title = styled.h2`
  font-weight : bold ;
  font-size : 1.7em;
  margin-bottom: 1rem;
`
export const CheckoutPreview = styled.div`
  display : flex ; 
  justify-content : ${props => props.mobileView || props.tabletView ? "center" : "space-between"};
  flex-direction : ${props => props.mobileView || props.tabletView ? "column" : "row"};
  padding-top : 2rem ;
  border-top : 1px solid #ccc;
`
export const Grid = styled.div`
  width : ${props => props.mobileView || props.tabletView ? "100%" :  props.w60 ? "58%" : "40%" } ;
  margin-bottom : ${props => props.mobileView || props.tabletView ? "2rem" : 0};
`