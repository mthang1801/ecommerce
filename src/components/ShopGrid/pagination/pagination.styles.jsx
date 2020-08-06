import styled from "styled-components";
import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
export const PaginationContainer = styled.div`
  width : 100%; 
  display : flex;
  justify-content : center;
`



export const OptionLink = styled(Link)`   
  cursor: pointer;
  padding : .75rem ;  
  color : black;
  text-decoration : none ;
  border: 1px solid #ccc;
  &:hover{
    background-color : #7fad39;   
    color : white ; 
  }
  &:not(:last-child){
    margin-right : .25rem;
  }
`

const ActiveLink = styled(Link)`
  text-decoration : none ;
  padding : .5rem ;  
  font-weight :bold ;
  color: white;
  background-color : #7fad39;
  &:not(:last-child){
    margin-right : .25rem;
  }
  &:hover{
    background-color : #7fad39;   
    color : white ; 
  }
`;


export const PageLink = ({ to, children, ...otherProps }) => { 
  const match = useRouteMatch({
    path: to,
  });   
  return match && match.isExact ? (
    <ActiveLink to={to} {...otherProps}>    
      {children}
    </ActiveLink>
  ) : (
    <OptionLink to={to} {...otherProps}>      
      {children}
    </OptionLink>
  );
};