import styled from "styled-components"

export const Wrapper = styled.form`
  width : 90vw; 
  margin : 1rem auto; 
  max-width : 600px;
  display : flex; 
  align-items: center;
  justify-content : space-between;
  border : 1px solid var(--blue-1);
  padding : 0.5rem 1rem;
  border-radius : 1rem;
  background : transparent;
  input, button{
    border : none ; 
    outline : none ; 
    background-color :transparent ;
  }
  input{
    flex : 1 ;
  }

`