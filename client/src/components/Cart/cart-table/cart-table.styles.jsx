import styled from "styled-components";
import { darken, lighten } from "polished";

export const TextContent = styled.div`
  display : flex ;   
`
export const ProductImage = styled.div``
export const CartTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 2rem auto;
  overflow: auto;
  font-size : 0.9em;
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
  max-height : 260px;
  margin : 1rem 0;
  @media screen and (min-width: 768px){
    ${TextContent} {
      width : 75%;
    }
    ${ProductImage} {
      width : 25%;
    }
  }
  @media screen and (max-width : 768px){
    ${TextContent} {
      width : 100%;
    }
    ${ProductImage} {
      display : none;
    }
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

export const ButtonLink = styled.span`
  font-size: 0.9em;  
  cursor: pointer;
  color : #3f51b5;
  &:hover {
    color: red;
  };
  margin: 0 1rem;
  &:first-child{
    margin-left : 0 ; 
  };
  &:last-child {
    margin-right : 0;
  }
`;

export const Column = styled.div`
  width: ${({ w40, w30}) => w40 ? "40%" : w30 ? "30%" : "20%"  } ; 
  margin-left : 1rem;
  display : flex ; 
  flex-direction : column; 
  justify-content : flex-start; 
  & > * {
    margin : 0.5rem 0;
  }
`



export const BtnActions = styled.div`
  display : flex ; 
  justify-content : flex-start ;    
  flex-direction : row ; 
  @media screen and (max-width: 768px) {
    flex-direction : column ;
    & > * {
      margin : 0;
    }
  }
`
export const ProductActionsChange = styled.div`
  display : flex; 
  align-items : center; 
  width: 100%;
  height: 2rem; 
  overflow : hidden;
  & > * {
    padding : 0.5rem 1rem;
  };
`
export const Quantity = styled.span`
  background-color : #eeeeee;
  color : black;
`

export const Button = styled.button`
  outline: none;
  border: 1px solid #ddd;
  background-color: inherit;
  cursor: pointer;
  background-color : #e0e0e0; 
  color: black;      
  border-radius : 5px;
  font-size: 1.1em;
  &:hover {
    background-color: #757575 ;
    color : white;
  }
`;

export const UnitPrice = styled.span``
export const TotalPrice = styled.span`
  font-weight : bold ; 
`