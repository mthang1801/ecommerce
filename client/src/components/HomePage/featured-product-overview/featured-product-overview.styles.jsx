import styled from "styled-components";

export const FeaturedProductOverViewContainer = styled.div`
  padding : 1rem;
  width : 95%; 
  margin : 3rem auto;
  display : flex ;   
  flex-wrap : wrap;
  position :relative;
`

export const Grid = styled.div`
  display : flex ;  
  width : ${props => props.tabletView ? "90%" : props.mobileView ? "95%" : "85%"};
  margin : auto;
  
`

