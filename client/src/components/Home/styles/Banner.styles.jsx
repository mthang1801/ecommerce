import styled from "styled-components";

export const Wrapper = styled.div`
  width : 100vw;  
  height: 35rem;
  padding: 1rem 4rem;
  margin : 2rem auto; 
  display : flex;
  flex-direction : column;
  @media screen and (min-width : 992px){
    flex-direction : row;
    height : 25rem;
    justify-content : space-between;
  }
`

export const CarouselSide = styled.div`
  width : 100%;
  height: 100%; 
  & img{
    width : 100%; 
    height :100%;
    object-fit: cover;
  }
  @media screen and (min-width : 992px){
    width : 60%;
  }
`

export const SingleImageSide = styled.div`
  width : 100%; 
  height: 100%; 
  & img {
    width : 100%;  
    height: 100%;   
    object-fit: cover;
  }
  @media screen and (min-width : 992px){
    width : 38%;
  }
`