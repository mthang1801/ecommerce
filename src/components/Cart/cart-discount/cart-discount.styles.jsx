import styled from "styled-components";
import {lighten} from "polished";
export const CartDiscountContainer = styled.div`
  width : 100%;
  display : flex ; 
  flex-direction: column ;
  padding : 0.5rem;
  & > * {
    padding :${props => props.mobileView || props.tabletView ? "0.5rem" : "0" };
  }
`

export const Label = styled.h3`
  font-size : 1.3em;
  font-weight : bold ; 
  margin-bottom : 1rem;
`

export const Form = styled.form`
  width : 100%;
  height : 3rem;
  display : flex; 
  justify-content : ${props => props.mobileView || props.tabletView ? "center" : "stretch" };
  align-items : ${props => props.mobileView || props.tabletView ? "center" : "stretch" };
`

export const Input = styled.input`
  padding : 1rem;  
  width : ${props => props.mobileView || props.tabletView ? "auto" : "50%" };
  min-width : 70%;
  height : 100%;
  font-size : ${props => props.mobileView || props.tabletView ? "1em" : "1.2em" };
  text-align :center;
`

export const Button = styled.button`   
  min-width : 15%;
  height : 100%;
  padding :${props => props.mobileView || props.tabletView ? "0 0.5rem" : "1rem 2rem" };
  margin-left: 1rem;
  outline : none ; 
  border:none ; 
  background-color : #757575;
  color : white;
  cursor : pointer;
  &:hover{
    background-color : ${lighten("0.1", "#757575")};
  }
`