import styled from "styled-components";
import { darken, lighten } from "polished";
export const CartTableContainer = styled.div`
  width: ${props => props.mobileView || props.tabletView ? "auto" : "100%"};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2rem auto;
  overflow: auto;
`;

export const TableHeader = styled.div`
  width: ${props => props.mobileView || props.tabletView ? "auto" : "100%"};
  display: flex;
  font-size: ${props => props.mobileView || props.tabletView ? "0.9em" : " 1.1em"};
  font-weight: bold;
  padding-bottom: ${props => props.mobileView || props.tabletView ? "0.5rem" : "2rem"};
  border-bottom: 1px solid #ccc;
  margin: ${props => props.mobileView || props.tabletView ? "0.5rem" : "2rem auto"};
`;
export const TableBody = styled.div`
  width: ${props => props.mobileView || props.tabletView ? "auto" : "100%"};
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const TableFooter = styled.div`
  width: ${props => props.mobileView || props.tabletView ? "auto" : "100%"};
  display: flex;
  font-size: 1.2em;
`;

export const Row = styled.div`
  width: ${({ product }) => (product ? "40%" : "12%")};
  display: flex;
  align-items: center;
  justify-content: ${({ product }) => (product ? "flex-start" : "center")};
  padding: ${({ product }) => (product ? "0.25rem" : "1rem")};
  ${TableHeader} & {
    justify-content: center;
  }
  color: ${({ totalPrice }) => (totalPrice ? "blue" : "inherit")};
`;

export const TableRow = styled.div`
  width: 100%;
  display: flex;
  &:nth-child(odd) {
    background-color: #f7faff;
    cursor: pointer;
    &:hover {
      background-color: ${darken("0.05", "#f7faff")};
    }
  }
  &:nth-child(even) {
    background-color: #fff5f2;
    cursor: pointer;
    &:hover {
      background-color: ${darken("0.05", "#fff5f2")};
    }
  }
`;

export const Button = styled.button`
  outline: none;
  border: none;
  background-color: inherit;
  cursor: pointer;
  color: #404040;
  font-size: 1.1em;
  &:hover {
    color: black;
  }
`;

export const Image = styled.img`
  width: 10rem;
  height: 10rem;
`;
export const Name = styled.div`
  width: 100%;
  font-weight: bold;
  margin-left: 1.5rem;
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BtnRemove = styled.span`
  font-size: 2em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
