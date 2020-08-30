import styled from "styled-components";

export const DepartmentWrapper = styled.div`
  display : flex ; 
  flex-direction : column;  
  margin-bottom : 1rem;
  & > * {
    font-size : 1em important ; 
  }
`

export const DepartmentLabel = styled.h3`
  text-align: center;
  font-weight : bold ;   
`