import styled from "styled-components";
export const BannerOverViewContainer = styled.section`
  display : flex ;   
  height : 500px;
  width : 100%;
  padding : 1rem;  
`

export const Grid = styled.div`
  width : ${({w25}) => w25 ? "25%" : "75%"}
`
