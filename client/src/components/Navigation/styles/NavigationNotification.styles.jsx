import styled from "styled-components";

export const  NavigationNotificationWrapper = styled.div`
  width : 100%;
  height : 100%;
  display : flex ; 
  justify-content : center;
  align-items:center; 

`
export const Option = styled.span`
  padding : 0 1rem;
  position :relative; 
`


export const CartPrice = styled.span`  
  font-size : 1em;
  over-flow : hidden;
  white-space: nowrap; 
  text-overflow : ellipsis;
  border: 1.5px solid #ccc;
  padding : 0.5rem 1rem;
  border-radius : 7px;
  cursor : pointer ;
  position :relative; 
  &:hover{ 
    background-color : #3f51b5;
    color : white ;   
    border-color: #3f51b5 ;
  }
  transition : all 0.2s;
`

export const CartNumber = styled.span`
  padding: 3px 6px; 
  font-size : 0.9em;
  background-color :#f1c40f; 
  color : black;
  border-radius : 5px; 
`
