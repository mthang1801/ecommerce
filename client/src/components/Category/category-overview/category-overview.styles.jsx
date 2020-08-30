import styled from "styled-components";

export const CategoryOverviewWrapper = styled.div`
  display: flex;
  flex-direction : ${({mobileView}) => mobileView ? "column" : "row"};
  width: 100%;
  padding:  ${(props) => props.mobileView || props.tabletView ? "0.5rem" : "2rem"};
  justify-content: center;
  overflow : hidden ;
`;

export const Grid = styled.div`
  margin: 1rem auto;
  width: ${(props) =>
      props.mobileView && !props.tabletView 
      ? "100%"
      : props.tabletView && !props.mobileView && props.w25 
      ? "40%"
      : props.tabletView && !props.w25 && !props.mobileView
      ? "60%"
      : props.w25 && !props.mobileView && !props.tabletView
      ? "25%"
      : "75%"};
`;
