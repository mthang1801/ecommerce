import styled from "styled-components"
export const Wrapper = styled.div`
  width : 90vw; 
  max-width : 400px;
  border: 1px solid var(--color-border-default);
  border-radius : 0.5rem;
  box-shadow : var(--mediumShadow);
  margin : 3rem auto;
  text-align : center;
  padding: 2rem;  
`

export const Controls = styled.div`
  margin : 2rem auto;
  text-transform : uppercase ;
  font-weight :bold;
  display : flex; 
  justify-content : space-around;
  & a:first-child{
    color : var(--blue-2);    
    &:hover{
      color : var(--blue-3);
    }
  }
  & a:last-child{
    color : var(--red-1);
    &:hover{
      color : var(--red-3);
    }
  }
`