import styled from "styled-components";
export const ProductSliderWrapper = styled.section`  
  width : 100%; 
  text-align:center;  
  height : 25rem; 
  margin-bottom : 2rem ;
`

export const Title = styled.h2`
  text-transform : uppercase ; 
  font-weight : bold;
`

export const Grid = styled.div` 
  display : flex ;
  justify-content : center;
  height : 100%;   
  & > *{
    width : 33% ; 
  }
  over-flow : hidden;
  &:focus{
    border : none;
    outline: none;
  }
`
