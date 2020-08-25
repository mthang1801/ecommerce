import styled from "styled-components";
export const BannerOverViewContainer = styled.section`
  display : flex ; 
  height :  ${({smallView}) => smallView ? "auto" : "33rem"} ;
  width :  ${({smallView}) => smallView ? "100%" : "80%"};
  margin : ${({smallView}) => smallView ? "1rem auto" : "0 0 0 auto"};  
  padding : 0.5rem;  
  overflow : hidden ; 
`
export const Grid = styled.div`
  width : ${({w60}) => w60 ? "60%" : "40%"};
  display :grid ; 
  grid-template-columns : 1fr 1fr ; 
  grid-template-rows: 1fr 1fr 1fr ; 
  grid-gap : 7px;
  &>*{
    margin-left: 1rem;
  }
`
export const Carousel = styled.div`
  grid-row : 1/ span 2; 
  grid-column : 1/ span 2;   
`

export const SmallBanner = styled.div`
  grid-row : 
`