import styled from "styled-components";


export const MasterHeaderContainer = styled.div`
  display : flex ;
  flex-direction : ${({isMobile}) => isMobile ? "column" : "row"} ;
  align-items : center;
  height : 3rem;
  width : 100%;
  position : relative;
  padding : 0 1.5rem;
  
`


export const Grid = styled.div`
  width : ${(props) => props.isMobile ? "80%" : props.w50 ? "50%" : "25%"};
  margin : ${({isMobile}) => isMobile ? "1rem auto" : "0 .5rem"};
  height : ${({isMobile}) => isMobile ? "3rem" : "100%"} ;
`