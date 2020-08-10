import styled from "styled-components";

export const ContactServicesContainer = styled.div`
  display : flex ; 
  justify-content : center;
  width : 90%;
  flex-direction : ${props => props.mobileView ? "column" : "row"};
  align-items :  ${props => props.mobileView ? "center" : "space-around"};
  margin : 3rem auto;
  flex-wrap : wrap;
`

export const  ServiceItem = styled.div`
  width : ${props => props.mobileView ? "100%" : props.tabletView ? "48%" : "22%"};
  display : flex; 
  flex-direction : column;
  align-items : center;  
  text-align: center;
  line-height : 1.7; 
`

export const Icon =styled.span`  
  font-size : 2.5em;
  color : #7fad39;
`

export const Label =styled.h3`
  font-size: 1.5em; 
  font-wieght : bold ; 
`
export const Text = styled.span`
  color : #666666;
`