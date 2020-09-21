import styled from "styled-components";

export const BackgroundContainer = styled.div`
  position :relative ;
  margin : 0 2rem;   
  display : flex;
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
export const BackgroundItem = styled.div`
  background-color : #3f51b5;
  color : white; 
  padding : 0.5rem 1.5rem 0.5rem 0.25rem;
  margin : 0;
  position :relative;
  &:first-child{
    margin-left: 0 ; 
  };
  &:last-child{
    margin-right :0;
  };
 &:not(:last-child){
  &:after{
    content: "❭";
    position: absolute;
    font-size: 2.75rem;    
    top: 0;
    transform: translate(-25%,-25%);
  }
 }
`
//  &:not(:first-child){
//   &:before{
//     content: "";
//     height: 0;
//     width: 0;
//     position: absolute;
//     border: 1.8rem solid;
//     top: 0;
//     left: 0;
//     transform: translateX(0);    
//     border-color: transparent transparent  transparent white;   
//   }
//  