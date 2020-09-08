import styled from "styled-components";
import {darken} from "polished";
export const Button = styled.button`
display : block;
outline: none;
border: none;
color: white;
background : linear-gradient(to right bottom, #547bf0 0%, #1940b3 100%);
cursor: pointer;
padding: 0.75rem 1.25rem;
border-radius: 7px;
margin: 1rem auto;
&:hover {
  background-color: ${darken("0.2", "#283593")};
}
`;
