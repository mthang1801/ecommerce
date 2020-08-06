import styled from "styled-components";
import {lighten} from "polished";
export const CartDiscountContainer = styled.div`
  width : 100%;
  display : flex ; 
  flex-direction: column ;
  pading : 0.5rem;
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
  align-items : center;
`

export const Input = styled.input`
  padding : 1rem;  
  width : 50%;
  height : 100%;
  font-size : 1.2em;
  text-align :center;
`

export const Button = styled.button`  
  height : 100%;
  padding : 1rem 2rem;
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