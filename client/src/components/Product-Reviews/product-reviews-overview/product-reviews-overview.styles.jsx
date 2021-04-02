import styled from "styled-components";

export const ProductReviewsOverviewWrapper = styled.div`
  width : 100%; 
  display : flex ; 
  flex-direction : column ;   
  justify-content : center;
  margin : 3rem 0;
 
`
export const Row = styled.div`
  width : 100%; 
  display : flex; 
  align-items :flex-start;  
  padding: 1rem 2rem;   
  @media screen and (max-width: 600px){
    flex-direction : column;
    & > * {
      width : 100% !important ; 
    }
   }
`
export const Grid = styled.div`
  width : ${({width, tabletView}) => width===25 && tabletView ? "40%" : width===75 && tabletView ? "60%" : width===25 ? "25%" : width===75 ? "75%" : "100%"};
  &:not(:first-child){
    margin-right : 1rem;
  }
`

export const Image = styled.img`
  max-width : 300px;
  object-fit : scale-down;
`

export const TextArea = styled.textarea`
  width : 100%;
  height : 6rem;
  resize : none ; 
  margin-top : 1rem;
  padding : 0.5rem ;
  outline : none ;
  border : 1.5px solid #3d5afe;
  border-radius : 6px;
  &:focus : {
    border-color:  #1a237e ;
  }
  @media screen and (max-width:600px){
    height: 8rem;
  };  
`

export const CompleteReview = styled.div`
  text-aliign : center; 
  margin : 4rem auto;
`