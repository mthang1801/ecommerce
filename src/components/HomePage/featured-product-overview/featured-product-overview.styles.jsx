import styled from "styled-components";

export const FeaturedProductOverViewContainer = styled.div`
  padding : 1rem;
  width : 90%; 
  margin : 3rem auto;
  display : flex ;   
  flex-wrap : wrap;
  position :relative;
`

export const Grid = styled.div`
  display : flex ;  
  width : ${props => props.tabletView ? "48%" : props.mobileView ? "90%" : "33%"};
  margin : auto;
  
`

