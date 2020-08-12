import styled from "styled-components";


export const MasterHeaderContainer = styled.div`
  display : flex ;
  flex-direction : ${({smallView}) => smallView ? "column" : "row"} ;
  align-items : center;
  height :  ${({smallView}) => smallView ? "100%" : "3rem"} ;
  width : 100%;
  position : relative;
  padding : 0 1.5rem;
  
`


export const Grid = styled.div`
  width : ${(props) => props.smallView ? "80%" : props.w50 ? "50%" : "25%"};
  margin : ${({smallView}) => smallView ? ".5rem auto" : "0 .5rem"};
  height : ${({smallView}) => smallView ? "2.5rem" : "100%"} ;
`