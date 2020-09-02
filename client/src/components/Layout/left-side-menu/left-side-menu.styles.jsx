import styled from "styled-components";
import {lighten} from "polished"
export const LeftSideMenuWrapper = styled.div`
  display : flex ; 
  flex-direction : column;  
  margin-bottom : 1rem;
  & > * {
    font-size : 1em important ; 
  }
`

export const Title = styled.h3`
  text-align: center;
  font-weight : bold ;   
`

export const ReadMore = styled.span`
  cursor: pointer;
  text-align: center;
  font-size: 0.9em;
  margin-top: 1rem;
  color: #273c75;
  &:hover{
    color : ${lighten("0.12", "#273c75")}
  }; 
`
