import styled from "styled-components";
import NumberFormat from "react-number-format";

export const Wrapper = styled.div`
  width : 90vw; 
  max-width : 1000px;
  margin: 1rem auto 3rem auto;
  h2{
    text-align: center;
  }
`

export const ImagesContainer = styled.div`
  display : grid; 
  grid-template-columns : repeat(3,1fr);
  & img{
    width : 100% ;     
  }
`