import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position :relative ;
  width : 100%; 
  height : 10rem;
  background : linear-gradient(to right bottom, #d1e3ff 0%, #3364b0 50%, #004dc4 100%);
  font-family: Roboto Condensed, sans-serif;
  overflow : hidden ;
  text-overflow: ellipsis;
    white-space: nowrap;
`

export const BackgroundImageContainer = styled.div`
  width :100%;
  height : 100%;
  margin : 1rem auto;
  background : ${({background}) => background ? `url(${background})` : "none"};
  background-position : center ; 
  background-size : cover ; 
  opacity : 0.4;  
`

export const BackgrounLabel = styled.h1`
  position : absolute ;  
  top : 50%; 
  left : 50%;
  transform : translate(-50%, -50%);
  font-size : ${({smallSize}) => smallSize ? "1.5em" : "2em"};
  text-transform : uppercase ;
  font-weight : 700;
  color : white; 

  @media screen and (max-width: 992px){
    font-size : 2em;
  }
  @media screen and (max-width: 500px){
    font-size : 1.4em;
  }
`