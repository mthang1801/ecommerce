import React from "react";
import styled from "styled-components";
import { Link, useRouteMatch } from "react-router-dom";

export const OptionLink = styled(Link)`   
  cursor: pointer;
  padding : .5rem ;
  text-transform: ${({textTransform}) => textTransform ? textTransform.toString().toLowerCase() : "uppercase"};
  color : black;
  text-decoration : none ;
  font-weight : bold ;   
  transition : var(--mainTransition);    
  &:hover{
    color : ${({color}) => color ? `${color}` : `var(--blue-1)` };        
  }  
`

const ActiveLink = styled(Link)`
  text-decoration : none ;
  padding :.5rem ;
  text-transform: uppercase;
  font-weight :bold ;
  border-bottom: 3px solid transparent;
  transition : var(--mainTransition);  
  &:hover{
    color : ${({color}) => color ? `${color}` : `var(--blue-1)` };        
  } 
`;

const Icon = styled.span`
    padding : 0 10px;
`

export const CustomLink = ({ to, children, icon,onMobile, color, ...otherProps }) => { 
  const match = useRouteMatch({
    path: to,
  }); 
  return match && match.isExact ? (
    <ActiveLink to={to} {...otherProps} color={color}>
     {onMobile &&  <Icon>{icon}</Icon>}
      {children}
    </ActiveLink>
  ) : (
    <OptionLink to={to} {...otherProps} color={color}>
      {onMobile &&  <Icon>{icon}</Icon>}
      {children}
    </OptionLink>
  );
};


