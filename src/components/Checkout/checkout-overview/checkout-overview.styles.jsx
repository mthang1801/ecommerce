import styled from "styled-components";

export const CheckoutOverviewContainer = styled.div`
  width: 90%;
  margin : 3rem auto;
`

export const Title = styled.h2`
  font-weight : bold ;
  font-size : 1.7em;
  margin-bottom: 1rem;
`
export const CheckoutPreview = styled.div`
  display : flex ; 
  justify-content : space-between;
  padding-top : 2rem ;
  border-top : 1px solid #ccc;
`
export const Grid = styled.div`
  width : ${({w60}) => w60 ? "55%" : "40%"};

`