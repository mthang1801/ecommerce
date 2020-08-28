import styled from "styled-components";
export const LatestProductsContainer = styled.section`  
  width : 100%; 
  text-align:center;  
`

export const Title = styled.h2`
  text-transform : uppercase ; 
  font-weight : bold;
`

export const Grid = styled.div` 
  display : flex ;
  justify-content : center;
  height : 800px;
  flex-direction : column;  
  over-flow : hidden;
  &:focus{
    border : none;
    outline: none;
  }
`
