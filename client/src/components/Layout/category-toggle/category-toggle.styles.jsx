import styled from "styled-components";
export const CategoryToggleContainer = styled.div`
  display : flex ; 
  width : 100%;  
  height : 100%;
  background-color : rgb(127,173,57);
  color : white;
  text-align:center;
  align-items: center;  
  &:hover{
    cursor : pointer;
    background-color : lighten(0.1, white)         
  };
  z-index: 1500;
`

export const CategoryLeft = styled.div`
  flex : 1 0 20%;
  display : flex ; 
  flex-direction : column;
  justify-content: space-around;
  align-items : center;
  height : 60%;
  z-index : 1500;      
`
export const Slash = styled.div`
  width : 1rem;
  height : .2rem;
  background-color : white;
`
export const CategoryMiddle = styled.div`
  flex : 2 0 60%;  
`
export const CategoryRight = styled.div`
  flex : 1 0 20%;
`