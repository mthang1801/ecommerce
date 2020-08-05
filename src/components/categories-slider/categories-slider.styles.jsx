import React from "react";
import styled from "styled-components";

export const CategoriesSliderContainer = styled.div`
  width : 85%;
  margin : 7rem auto;
  text-align : center;
`

export const Caption = styled.div`
  font-weight : bold ; 
  font-size : 2em;
  text-transform : uppercase;
`

export const CategoryItem = styled.div`
  margin : auto; 
  text-align :center;
  height : 200px;  
  &:focus{
    border : none;
    outline: none;
  }
`

export const CategoryImage = styled.img`
  display : inline-block;
  margin: auto;
  max-width : 250px;
  max-height : 300px;
  width : 100%;
  height : 100%;
`

export const CategoryName = styled.div`
  font-weight : bold;
  text-transform : uppercase ; 
  font-family : Cairo , "sans serif" ;
`

export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", backgroundColor : "gray"}} 
      onClick={onClick}
    />
  );
}


export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}     
      style={{ ...style, display: "block", backgroundColor : "gray"}} 
      onClick={onClick}
    />
  );
}

