import styled from "styled-components";
import {Link} from "react-router-dom"
import {darken} from "polished";
export const FooterContainer = styled.footer`
  width : 100%;
  background-color : #F3F6FA;
  padding : 4rem;
  display : flex ;     
  justify-content : ${(props) => props.mobileView ? "center" : "space-around"} ;
  text-align : ${(props) => props.mobileView || props.tabletView ? "center" : "left"} ;
  align-items : ${(props) => props.mobileView || props.tabletView? "center" : "stretch"} ;
  flex-wrap : wrap ;
  & > * {
    width :  ${(props) => props.mobileView ? "90%" : props.tabletView ? "48%" : "33%"} ;
    padding : 1rem 0;
  }
`

export const  FooterAbout = styled.div`
  font-size : 1.1em
  display : flex ; 
  flex-direction : column;
`
export const  FooterLogoContainer = styled(Link)`  
  text-decoration : none;
`
export const  FooterLogo = styled.img`
  max-width : 6rem;
  max-height : 6rem;    
`
export const  UnorderList = styled.ul`
  list-style : none ;
`
export const  List = styled.li``
export const  FooterWidget = styled.div`
  display : flex ; 
  flex-direction : column ;
`
export const Grid = styled.div`
  display : grid ; 
  grid-template-columns : 1fr 1fr ; 
`
export const Title = styled.h2`
  font-weight : bold ; 
  font-size : 1.3em;
  text-transform : capitalize;
`

export const Side = styled.div`
  display : flex ; 
  flex-direction : column ; 
  justify-content : space-between;
`

export const  FooterContact = styled.div`
`

export const CustomLink = styled(Link)`
  text-decoration : none ; 
  color : inherit ;
  &:hover{
    color : #7fad39;
  }
`

export const SubTitle = styled.p`
  color : inherit
`

export const Form = styled.form`
  margin : 1rem auto;
  width : 100%;
  height : 2.5rem;
  display : flex;
`

export const Input = styled.input`
  outline : none ;
  padding : .5rem;
  font-size : 1.1em;
  width : 70%;
  height :100%;
`

export const Button = styled.button` 
  outline : none ;
  border : none ;
  background-color : #7fad39;    
  width : 30%;
  font-size:  1.1em;
  height : 100%;
  color : white ;
  cursor : pointer; 
  &:hover{
    background-color : ${darken("0.1", "#7fad39")}
  }
`

export const Icons = styled.div`
  display : flex ;    
`

export const SocialLink = styled(Link)`  
  color : inherit ;
  width : 3rem;
  height : 3rem ; 
  border-radius : 50%;
  background-color : white; 
  display : flex ; 
  justify-content : center;
  align-items : center;
  font-size : 1.5em;
  &:not(:last-child)  {
    margin-right : 1rem;
  }
  &:hover{
    background-color : #7fad39;
    color : white;
  }
  
`