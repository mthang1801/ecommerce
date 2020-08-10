import styled from "styled-components";
export const BannerOverViewContainer = styled.section`
  display : block ;   
  height :  ${({smallView}) => smallView ? "auto" : "30rem"} ;
  width : ${({smallView}) => smallView ? "100%" : "75%"};
  margin : ${({smallView}) => smallView ? "1rem auto" : "0 0 0 auto"};
  padding : 0.5rem;  

`
