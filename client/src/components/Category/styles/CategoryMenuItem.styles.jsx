import styled from "styled-components";
import { Link } from "react-router-dom";
export const CustomLink = styled(Link)`
  cursor: pointer;
  display: block;
  background-color: ${({ active }) => (active ? "var(--blue-1)" : "inherit")};
  color: ${({ active }) => (active ? "white" : "inherit")};
  padding: 0.5rem 1rem;
  &:hover {
    background-color: var(--blue-1);
    color: white;
  }
  ${({active}) => active && `&::after {
    position: absolute;
    content: ""; /* this is important */
    border: 1rem solid var(--blue-1);  
    transform : translateY(-0.5rem)    ;
    right: -2rem; 
    border-color : transparent transparent transparent var(--blue-1);
    z-index: 1001;
  }`}
  
`;
