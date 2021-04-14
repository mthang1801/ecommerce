import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  min-height: 60vh;
  max-height: 80vh;
  border-radius : 0.5rem 0 0 0.5rem;
  font-size : 0.9rem;
  border: 1px solid #ccc;
  transition: height 0.3s;
  position: absolute;
  top : 80%;
  left: 5%;
  background-color: white;
  top: calc(100%);
  color: black;
  text-align: left;
  z-index: 1100;
  ${({open}) => !open && `
    opacity: 0 ;
    visibility : hidden ; 
    height: 0 ; 
    z-index: -1;
  `}
`;


export const CategoriesBoard = styled.div`
  position : absolute;
  left: 20vw;
  top : 0%;  
  height: 100%;
  
`