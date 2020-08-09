import styled from "styled-components";
import {lighten} from "polished"
export const ProductProfileTextContainer = styled.div`
  width : 100%; 
  margin :  ${props => props.mobileView ||  props.tabletView    ? "1rem auto" : "auto"} ;
  padding : ${props => props.mobileView ? "0.2rem" : props.tabletView  ? "1rem" : "1rem 3rem"} ;
  border-left : 1px solid #eee;
  height : 100% ; 
`
export const Title = styled.h2`
  font-size : 1.6em ;
  font-weight : bold ;  
`
export const Reviews = styled.div`
  margin: 1rem 0;
  display : flex ; 
  align-items : center;
  font-size : 0.95em;
`
export const Span = styled.span`
  color : ${({color}) => color ? color : "inherit" };
`
export const Price = styled.h4`
  color : #dd2222;
  font-size : 1.4em;
`

export const BriefTextsInfo = styled.ul` 
  margin : 1rem;
  line-height : 1.6;
`

export const TextItem = styled.li``
export const  ProductActions = styled.div`
  display : flex ;   
  height : 3rem; 
  align-items : center;  
  margin : 2rem auto;
  overflow : hidden ;
  &  > *{
    margin-right : 1rem;
  }
`
export const  ProductQuantity = styled.div`
  display : flex ; 
  align-items : center; 
  justify-content : center;
  font-size : 1.2em;  
  height : 100%;
`
export const  Button = styled.button`
  outline : none ; 
  border : none  ;
  padding : 1rem;
  text-transform : uppercase ; 
  background-color : ${({bgColor}) => bgColor ? bgColor : "#404040"};
  color : white;
  fonto-weight : 600;
  height : 100%;
  display : flex ; 
  align-items : center;
  cursor : pointer; 
  &:hover{
    background-color : ${({bgColor}) => bgColor ? lighten("0.1",bgColor ) :  lighten("0.1","#404040")};
  }
`
export const  Paragraph = styled.div`
  padding : 1rem;
  background-color : #ccc;
`

export const ProductStatus = styled.div`
  margin : 1rem auto;
  padding : ${props => props.mobileView ? "0.5rem" : props.tabletView  ? "1rem" : "2rem"} ;
  background-color : #e8e8e8;
  display : flex ; 
  flex-direction : column;
  width : 100%;
`

export const StatusText = styled.h4`
  font-wieght : 600;
  font-size : 1.3em;
`

export const Row = styled.div`
  display : flex ; 
  justify-content : space-between ; 
  align-items : center;
  padding :1rem;
  &:not(:last-child){
    border-bottom : 1px solid #ccc;
  }
  text-align : left ; 
  & > span{
    width : 50%;
  }
`

export const Icons = styled.span`
  display : flex ; 
  font-size : 1.4em;
  width : 100%;
  justify-content : flex-start;
`

export const Icon = styled.span`
  display : flex ; 
  width : 2rem; 
  height : 2rem ;
  border-radius : 50%;
  background-color : #eee;
  color : inherit ;
  align-items : center; 
  justify-content : center;
  cursor : pointer;
  &:hover{
    background-color : #7fad39; 
    color : white;
  }
  &:not(:last-child){
    margin-right : 1rem;
  }
`