import styled from "styled-components";

export const MasterBannerContainer = styled.div`
  display : flex ; 
  flex-direction : column;
  background : ${({img}) => img ? `url(${img})` : ""};
  background-position : center; 
  background-size : cover ;
  height : 100%; 
  align-items : flex-start;
  justify-content :center;
  padding : ${({mobileView}) => mobileView ? "2rem" : "5rem"} ;
  position : relative; 
  overflow : hidden ;
  margin-left: 1rem;
`


export const  MainTitle= styled.div`
  text-transform : uppercase ; 
  color : #7fad39;
  font-size : 18px;
  font-weight : bold ;
` 
export const  SubTitle= styled.div`
  display : flex ; 
  flex-direction : column;
  font-size : 3em;
  line-height : 1.2;
  font-weight : 800;
` 

export const Span = styled.span``
export const  Notice= styled.div`
  color : rgba(0,0,0,.7)
` 
export const  Button= styled.button`
  display : inline-block;
  outline : none ; 
  border : none;
  background-color : #7fad39;
  padding : .75rem 1.5rem;
  text-transform : uppercase ;
  color : white ;
  cursor : pointer; 
  &:hover{
    background-color : #7fbf1d;
  }
` 