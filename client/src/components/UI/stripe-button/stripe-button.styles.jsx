import styled from "styled-components";
import {darken} from "polished";
export const Button = styled.button`
display : block;
outline: none;
border: none;
color: white;
background-color : #283593;
cursor: pointer;
padding: 0.75rem 1.25rem;
border-radius: 7px;
margin: 1rem auto;
&:hover {
  background-color: ${darken("0.2", "#283593")};
}
`;
