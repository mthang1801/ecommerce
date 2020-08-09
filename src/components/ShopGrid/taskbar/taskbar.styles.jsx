import styled from "styled-components";

export const TaskBarContainer = styled.div`
  display : flex ; 
  justify-content : ${props => props.mobileView ? "center" : "space-between"};
  align-items : center;
  padding : 0.5rem ;
  width : 100%;
  height : ${props => props.mobileView || props.tabletView ? "5rem" : "auto"};
  flex-direction : ${props => props.mobileView ? "column" : "row"};
`

export const Grid = styled.div`  
  display: ${props => ( (props.mobileView && props.hideSm) || (props.mobileView && props.hideMd)|| ( props.tabletView && props.hideMd ) ? "none" : "flex")};
  width :  ${props =>  props.mobileView ? "100%" : props.tabletView ? "auto" : "33.33%" };
  align-items: center;  
`
export const Paragraph = styled.p``
export const Strong = styled.strong``
export const Select = styled.select`
  padding : .5rem ;
  margin-left : 1rem;  
  height : 2rem;
`
export const Option = styled.option`
  font-size : 1.1em;
`

export const Settings = styled.div`
  width : 100%; 
  display : flex ; 
  justify-content :flex-end; 
  align-items :center;
`

export const Button = styled.span`  
  font-size : 1.5em;
  cursor : pointer ; 
  &:first-child{
    margin-right : 1rem;
  }
  padding : 0.5rem; 
  background-color : ${({active}) => active ? "#eee" : "inherit"};
  border-radius : 5px;
  &:hover {
    color : #7fad39;
  }
`