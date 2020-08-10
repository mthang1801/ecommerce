import styled from "styled-components";

export const TermsAndPrivacyContainer = styled.div`
  width : ${props => props.mobileView ? "100%" : props.tabletView ? "85%" : "75%"}; 
  padding : ${props => props.mobileView ? "0.5rem 1rem" : props.tabletView ? "1rem 1.5rem" : "2rem"}; 
  margin : auto;

`