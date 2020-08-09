import styled from "styled-components";

export const MainInterfaceContainer = styled.div`
  width : 100%;
  display : flex ;   
  flex-direction : ${props => props.mobileView || props.tabletView ? "column" : "row"};
`

export const Grid = styled.div`
  width : ${(props) => props.mobileView  ||props.tabletView ? "100%" : props.w40 ? "40%" : "60%" };
`