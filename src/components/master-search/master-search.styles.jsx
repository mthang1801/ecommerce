import React from "react";
import styled from "styled-components";
const Search = ({value, onChange, ...props}) => {
  return (
    <input  {...props} type="text" placeholder="What do you need?" value={value} onChange={onChange}/>
  )
}
export const MasterSearchContainer = styled.div`
  border : 1px solid #ccc; 
  display : flex ; 
  width : 100%;
  height : 100%; 
`

export const CategoryTypes = styled.div`
  padding : .5rem 1rem ;
  text-align:center;
  border-right : 1px solid #ccc;
`
export const SearchInput = styled(Search)`  
  flex-grow : 1 ;
  margin : 0 1rem;
  padding : .5rem;
  border : none ;
  outline : none ;
`
export const SearchButton = styled.button`
  outline : none ; 
  border : none ;
  font-size : 1.05em;
  color : white;
  background-color : #7fad39;
  padding : .5rem 1rem;
  cursor : pointer;
  &:hover { 
    background-color : #7fbf1d;
  }
  transition : all .25s;
`

