import React from "react";
import {CustomPortfoliosArrowPrevContainer, CustomPortfoliosArrowNextContainer} from "./styles/CustomArrowSlider.styles"
export const CustomArrowPrev = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", opacity : "0.9" , position : "absolute", left: "3%", zIndex: 1}}
      onClick={onClick}
    />
  )
}
export const CustomArrowNext = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background:  "transparent", opacity : "0.9" , position : "absolute", right: "3%", zIndex: 1 }}
      onClick={onClick}
    />
  )
}
export const CustomPortfoliosArrowPrev = (props) => {
  const { className, style, onClick } = props;
  return (
    <CustomPortfoliosArrowPrevContainer           
      onClick={onClick}
    />
  )
}
export const CustomPortfoliosArrowNext = (props) => {
  const { className, style, onClick } = props;
  return (
    <CustomPortfoliosArrowNextContainer     
      onClick={onClick}
    />
  )
}