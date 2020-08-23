import styled from "styled-components";
import NumberFormat from "react-number-format";
export const FormCreateProductWrapper = styled.div`
  display: flex;
  width: 95%;
  margin: 2rem auto;
  overflow: hidden;
  font-family: Roboto Condensed, sans-serif;
  flex-direction: ${({ smallView }) => (smallView ? "column" : "row")};
`;

export const CustomNumberFormat = styled(NumberFormat)`
  width: 100%;
  height: 2.5rem;
  padding: 0.1rem;
  font-size: 1.1em;
  border: none;
  outline: none;
  border-bottom: 1px solid #424242;
  &:focus {
    border-bottom: 2px solid #002984;
  }
`;

export const List = styled.div`
  position: relative;
  margin-top: ${({ isDiscount }) => (isDiscount ? 0 : "-3rem")};
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.25s;
  margin-bottom : 2rem; 
`;
export const DisplayImage = styled.div`
  width :100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  align-content: start;  
  margin-top : ${({smallView}) => smallView ? "2rem" : "8rem"}  ;
`;

export const Image = styled.img`
  width: 150px;
  height: 200px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  object-fit: cover;
`;

export const Grid = styled.div`
  width: ${({ smallView, w60 }) => (smallView ? "100%" : w60 ? "60%" : "40%")};
`;
