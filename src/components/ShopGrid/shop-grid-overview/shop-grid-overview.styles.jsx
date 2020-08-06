import styled from "styled-components";

export const ShopGridOverviewContainer = styled.div`
  font-family : Roboto , "sans serif";
  display : flex ; 
  width : 100%; 
  padding : 2rem ; 
  justify-content : center;
`

export const Grid = styled.div`
  margin : 1rem auto;
  width : ${({w25}) => w25 ? "25%" : "75%"};  
`