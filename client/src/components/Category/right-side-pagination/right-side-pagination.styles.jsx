import styled from "styled-components";
import React from "react";
import {Link, useRouteMatch} from "react-router-dom";
export const PaginationContainer = styled.div`
  width : 100%; 
  display : flex;
  justify-content : center;
  margin : 3.5rem auto ;
`

export const PageLink = styled.span`
  display : flex; 
  padding : 0.4rem 0.8rem;
  border : 1px solid #ccc; 
  &:not(:first-child){
    margin-left : 0.25rem; 
  }
  &:not(:last-child){
    margin-right : 0.25rem;
  };
  cursor : pointer; 
  &:hover{
    background-color : #7fad39;
    color : white; 
  };
  background-color : ${({active}) => active ? "#7fad39" : "white"};
  color : ${({active}) => active ? "white" : "inherit"};
`