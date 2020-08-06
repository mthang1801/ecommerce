import styled from "styled-components";

export const TaskBarContainer = styled.section`
  display : flex ; 
  justify-content : space-between;
  padding : 1rem ;
`

export const Grid = styled.div`
  flex : 1 0 33.3%;
  width : 33.3%;
  display : flex;  
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