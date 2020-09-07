import styled from "styled-components";
import {darken} from "polished"
export const OrderedCompleteWrapper = styled.div`
  width: 95%;
  margin : 3rem auto;
  display : flex;  
  flex-direction : column ;
  justify-content : center;
  align-items: center;
`

export const Button = styled.button`
  display : block;
  outline: none;
  border: none;
  color: white;
  background-color: #283593;
  cursor: pointer;
  padding: 0.75rem 1.25rem;
  border-radius: 7px;
  margin: 1rem auto;
  &:hover {
    background-color: ${darken("0.2", "#283593")};
  }
`;

export const Grid = styled.div`
  width : ${({w25, mobileView, tabletView}) => mobileView ? "100%" : tabletView && w25 ? "40%" : tabletView && !w25 ? "60%" : w25 ? "25%" : "75%"}
`

