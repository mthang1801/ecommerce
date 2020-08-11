import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";
import {darken} from "polished"
export const OptionLink = styled(Link)`   
  cursor: pointer;
  color : ${darken("0.2", "white")} ; 
  text-decoration : none ;    
  &:hover{
    color : white;
  };
  display : flex ; 
  align-items : center;

`

const ActiveLink = styled(Link)`
  text-decoration : none ;   
  font-weight :bold ;
  color: white ;  
  display : flex ; 
  align-items : center;
`;

const Icon = styled.span`
    padding : 3px 5px 0 5px;
    font-size : 1em;
`

export const CustomLink = ({ to, children, icon, ...otherProps }) => { 
  const match = useRouteMatch({
    path: to
  }); 
  return match && match.isExact ? (
    <ActiveLink to={to} {...otherProps}>
      {icon && <Icon>{icon}</Icon>}
      {children}
    </ActiveLink>
  ) : (
    <OptionLink to={to} {...otherProps}>
      {icon &&  <Icon>{icon}</Icon>}
      {children}
    </OptionLink>
  );
};


