import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

export const OptionLink = styled(Link)`   
  cursor: pointer;
  padding : .5rem ;
  text-transform: uppercase;
  color : black;
  text-decoration : none ;
  font-weight : bold ; 
  &:hover{
    color : rgb(127, 173, 57);    
  }
`

const ActiveLink = styled(Link)`
  text-decoration : none ;
  padding : .5rem ;
  text-transform: uppercase;
  font-weight :bold ;
  color: rgb(127, 173, 57);

`;

const Icon = styled.span`
    padding : 0 10px;
`

export const CustomLink = ({ to, children, icon,onMobile, ...otherProps }) => { 
  const match = useRouteMatch({
    path: to,
  }); 
  return match && match.isExact ? (
    <ActiveLink to={to} {...otherProps}>
     {onMobile &&  <Icon>{icon}</Icon>}
      {children}
    </ActiveLink>
  ) : (
    <OptionLink to={to} {...otherProps}>
      {onMobile &&  <Icon>{icon}</Icon>}
      {children}
    </OptionLink>
  );
};


