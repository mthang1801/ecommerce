import styled from "styled-components";

export const CustomPortfoliosArrowPrevContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--light-gray-1);
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: -1%;
  transform: translateY(-50%);
  z-index: 1;
  border-radius: 50%;
  &:hover {
    background-color: var(--light-gray-2);
    width: 2.5rem;
    height: 2.5rem;
    &:before {
      font-size: 1.5rem;
    }
  }
  &:before {
    content: "❮";
    font-size: 0.9rem;
    color: white;
    position : absolute; 
    left: 50%; 
    top : 40%; 
    transform : translate(-50%, -50%);
  }
`;

export const CustomPortfoliosArrowNextContainer = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--light-gray-1);
  cursor: pointer;
  position: absolute;
  top: 50%;
  right : -1%;  
  transform: translateY(-50%);
  z-index: 1;
  border-radius: 50%;
  
  &:hover {
    background-color: var(--light-gray-2);
    width: 2.5rem;
    height: 2.5rem;
    &:after {
      font-size: 1.5rem;
    }
  }
  &:after {
    content: "❯";
    font-size: 0.9rem;
    color: white;
    position : absolute; 
    left: 50%; 
    top : 40%; 
    transform : translate(-50%, -50%);
  }
`;
