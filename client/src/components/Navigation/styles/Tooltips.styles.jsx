import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 120%;
  left : -2rem;  
  background-color: blue;
  text-align: center;
  transition: var(--mainTransition);
  background-color : var(--color-card-dark);
  color : var(--color-text-dark);
  padding : 0.5rem ;
  border-radius : 0.4rem;
  width : auto;
  min-width : 10rem;
  font-size : 0.9rem; 
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
