import styled from "styled-components";

export const Wrapper = styled.div`
  width : 100vw;  
  padding: 1rem 3rem;
  height: 50rem;  
  margin : 1rem auto; 
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
  overflow : hidden ;
  margin : 1rem auto;
  & img{
    width : 100%; 
    height :100%;
    object-fit: cover;
  }
  @media screen and (min-width : 992px){
    width : 60%;
    height :100%;    
    margin : 0;
  }
`

export const SingleImageSide = styled.div`
  width : 100%; 
  height: 100%; 
  overflow : hidden ;
  margin : 2rem auto;
  & img {
    width : 100%;  
    height: 100%;   
    object-fit: cover;
  }
  @media screen and (min-width : 992px){
    width : 38%;
    height : 100%;
    margin : 0;
  }
`