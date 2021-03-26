import styled from "styled-components";
import React from "react";
import { darken } from "polished";
export const Table = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-width: 900px;
  margin: auto;  
  font-size : 0.85em;
  max-height : 450px;
  overflow : auto;
`;

export const Thead = styled.div`
  width: 100%;
  font-weight: bold;
  & > * {
    background-color: #192a56 !important;
    color: white;
  }
  text-align: left;
`;
export const Tbody = styled.div`
  text-align: left;
`;

export const TFooter = styled.div`  
  background-color: #192a56 !important;
  color: white;
  font-weight: bold;
  display : flex ; 
  justify-content : flex-end ;  
  align-items : center;
  padding : 0.5rem 1.5rem; 
`

export const Row = styled.div`
  padding: 0.2rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;  
  height: 3rem;
  &:nth-child(odd) {
    background-color: #f6e58d;
    &:hover {
      background-color: ${darken("0.1", "#f6e58d")};
    }
  }
  &:nth-child(even) {
    background-color: #dff9fb;
    &:hover {
      background-color: ${darken("0.1", "#dff9fb")};
    }
  }
 
`;

export const Data = styled.span`
  display : inline-block;    
  flex : ${({flex}) => flex };  
  
  ${Thead} & {
    & span {
      &:first-child {
        visibility: "hidden";
      }
    }
  }
  ${Tbody} & {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:last-child {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  transition: all 0.5s;
`;

export const Button = styled.span`
  vertical-align: middle;
  width: 2rem;
  height: 2rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: ${({ color }) => (color ? color : "inherit")};
  &:hover {
    background-color: white;
    color: ${({ color }) => (color ? color : "inherit")};
    border: 1px solid ${({ color }) => (color ? color : "inherit")};
  }
`;

export const BtnText = styled.span`
  color: ${darken("0.2", "white")};
  cursor: pointer;
  &:hover {
    color: white;
  } ; 
  padding : 0.75rem;
  &:disabled{
    color : red;
  }
`;

export const Select = styled.select`
  padding : 0.15rem 0.5rem;
  border:  none ; 
  outline : none ;
  font-size : 1.1em;
`

export const Option = styled.option``