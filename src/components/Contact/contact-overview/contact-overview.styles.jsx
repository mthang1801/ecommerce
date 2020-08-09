import styled from "styled-components";

export const ContactOverviewCotnainer = styled.div`
  width : 100%; 
  margin : ${props => props.mobileView || props.tabletView ? "1rem auto" : "3rem auto"};
`

