import styled from "styled-components";

export const CartOverViewContainer = styled.div`  
  width : ${props => props.mobileView || props.tabletView ? "95%" : "88%"};
  overflow : auto ;
  margin : 3rem auto;
`

export const Row = styled.div`
  width : 100%; 
  display : flex ; 
  justify-content : ${({mobileView, tabletView}) => mobileView || tabletView ? "center" : "space-between"} ;
  flex-direction : ${({mobileView, tabletView}) =>  mobileView  ? "column" : "row"}
`

export const Grid = styled.div`
  width :  ${({mobileView, tabletView,w70}) => mobileView ? "100%" : tabletView && w70 ? "60%" : tabletView && !w70 ? "40%" : w70 ? "70%" : "30%" } 
`