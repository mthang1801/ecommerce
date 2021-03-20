import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
export const CategoriesSliderContainer = styled.div`
  width : 90%;  
  margin : 3rem auto;
  text-align : center; 
`

export const Caption = styled.div`
  font-weight : bold ; 
  font-size : 2em;
  text-transform : uppercase;
  margin :1rem auto;
`

export const CategoryItem = styled(Link)`
  margin : auto; 
  cursor : pointer; 
  color : inherit ; 
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
  margin: 0.5rem auto;
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

