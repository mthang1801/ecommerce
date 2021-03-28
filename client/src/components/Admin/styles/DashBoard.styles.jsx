import styled from "styled-components";
import {NavLink} from "react-router-dom"
export const Wrapper = styled.div`
  margin-top : 4rem;  
  & > * {
    margin-bottom : 1rem;
  }  
`

export const CustomLink = styled(NavLink)`
  display : flex; 
  align-items : center;
  text-transform  :capitalize ; 
  color : inherit ;
  background : ${({active}) => active ? "linear-gradient(to right, #bbdefb , #90caf9)" : "var(--transparent)"};
  border-right : 7px solid ${({active}) => active ? "#fb8c00" : "var(--transparent)"};
  &:hover{    
    background : linear-gradient(to right, #bbdefb , #90caf9);
  }
  padding: 0.5rem 1rem;
  & span{
    display : flex;
    align-items: center;
  }
  & span:first-child{
    margin-left : 0.5rem;
  }
  & span:not(first-child){
    margin-right : 0.5rem;
  }
  & svg{
    font-size : 1.4rem;
  }
`

export const DropdownWrapper = styled.div`
  display : flex;
  flex-direction : column;  
  ${CustomLink}{
    padding: 0.5rem 0 0.5rem 2.5rem;
  }
`

export const ButtonDropdown = styled.span`
  cursor : pointer;
  padding : 0.5rem 1rem;
  display : flex; 
  align-items : center;
  text-transform  :capitalize ;
  & span{
    display : flex;
    align-items: center;
  }
  & span:first-child{
    margin-left : 0.5rem;
  }
  & span:not(first-child){
    margin-right : 0.5rem;
  }

  & span:last-child{
    margin-left : 0.1rem;
    transform : scale(0.4);
    align-self : flex-end;
  }
  & svg{
    font-size : 1.4rem;
  }
`

export const Dropdown = styled.div`
  // padding : 0 1.5rem;
  transition : var(--mainTransition);
  ${({show}) => show ? `
    height: auto; 
    visibility : visible; 
    opacity : 1; 
  ` : `
  height: 0; 
  visibility : hidden; 
  opacity : 0; 
  `}
`