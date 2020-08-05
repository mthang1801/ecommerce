import styled from "styled-components";

export const MasterHeaderContainer = styled.div`
  display : flex ;   
  height : 3.5rem;
  width : 100%;
  position : relative;
  padding : 0 1.5rem;
`

export const Grid = styled.div`
  width : ${({w50}) => w50 ? "50%" : "25%"}
`