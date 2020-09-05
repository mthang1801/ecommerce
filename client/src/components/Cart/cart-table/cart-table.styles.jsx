import styled from "styled-components";
import { darken, lighten } from "polished";
export const CartTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2rem auto;
  overflow: auto;
  font-size : 0.9em;
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
  color: ${({ totalPrice }) => (totalPrice ? "blue" : "inherit")};
`;

export const TableRow = styled.div`
  width: 100%;
  display: flex;
  margin : 1rem 0;
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
  width: 100%;
  height: auto;
`;
export const Name = styled.div`
  width: 100%;
  font-weight: bold;  
  white-space: wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BtnRemove = styled.span`
  font-size: 0.9em;  
  cursor: pointer;
  color : #3f51b5;
  &:hover {
    color: red;
  }
`;

export const ProductInfo = styled.div`
  width: 40% ; 
  margin-left : 1rem;
  display : flex ; 
  flex-direction : column; 
  justify-content : space-around; 
`

export const ProductImage = styled.div`
  width : 25% ; 
`

export const BtnActions = styled.div`
  display : flex ; 
  justify-content : flex-start ;     
`