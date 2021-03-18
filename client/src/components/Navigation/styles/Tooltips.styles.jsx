import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 120%;
  left : -2rem;  
  background-color: blue;
  text-align: center;
  transition: var(--mainTransition);
  background-color : var(--gray-1);
  color : var(--color-text-dark);
  padding : 0.5rem ;
  border-radius : 0.4rem;
  width : auto;
  min-width : 10rem;
  font-size : 0.9rem; 
  text-transform : uppercase ; 
  font-weight :bolder;

  ${({ show }) =>
    show
      ? `
    
    opacity : 1 ;
    visibility : visible; 
  `
      : `    
  opacity : 0 ;
  visibility : hidden; 
  `}
  
  
`;
