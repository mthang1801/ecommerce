import styled from "styled-components";
export const ProductItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30%;
`;

export const ProductImageContainer = styled.div`
  margin: auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ProductImage = styled.img`
  width: 8rem;
  height: 8rem;
`;
export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  height : 100%;
  width: 60%;
  text-align: left;  
  justify-content : center;
  line-height : 2;
`;
export const ProductName = styled.span`
  width: 80%;
  font-weight: bold;
  font-size: 1.2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const ProductDiscountPrice = styled.span`
  color: red;
  font-weight: bold;
  font-size: 1.1em;
`;

export const OriginalPrice = styled.span`
  font-size: ${({ discount }) => (discount ? "1em" : "1.1em")};
  text-decoration: ${({ discount }) => (discount ? "line-through" : "none")};
  color: ${({ discount }) => (discount ? "#ccc" : "000")};
  font-weight: bold;
`;
