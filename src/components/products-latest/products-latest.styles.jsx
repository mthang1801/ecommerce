import styled from "styled-components";
export const LatestProductsContainer = styled.section`  
  width : 100%; 
  text-align:center;
`

export const Title = styled.h2`
  text-transform : uppercase ; 
  font-weight : bold;
`

export const Grid = styled.div`
  display : flex ;
  justify-content : center;
  height : 800px;
  flex-direction : column;  
  over-flow : hidden;
  &:focus{
    border : none;
    outline: none;
  }
`

export const Slot = styled.div`
  display : flex ; 
  align-items : center;
  justify-content : center;
  width : 100%;
  height : 30%;
`

export const ProductImageContainer = styled.div`
  margin :auto;
  width : 40%;  
`
export const ProductImage = styled.img`
  width : 8rem;
  height : 8rem;
`
export const ProductLabel = styled.div`
  display : flex;
  flex-direction : column;
  text-align:left;
  flex-grow : 1;
  width : 60%; 
`
export const ProductName = styled.span`
  width : 80%;
  font-weight: bold ;
  font-size : 1.2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const ProductDiscountPrice = styled.span`
  color :red;
  font-weight : bold ;
  font-size : 1.1em;
`

export const OriginalPrice = styled.span`
  font-size : ${({discount}) => discount ? "1em" : "1.1em" };
  text-decoration : ${({discount}) => discount ? "line-through" : "none" };
  color : ${({discount}) => discount ? "#ccc" : "000" };
  font-weight : bold ;
`
