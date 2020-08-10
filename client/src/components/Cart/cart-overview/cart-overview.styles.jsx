import styled from "styled-components";

export const CartOverViewContainer = styled.div`  
  width : ${props => props.mobileView || props.tabletView ? "95%" : "88%"};
  overflow : auto ;
  margin : 3rem auto;
`