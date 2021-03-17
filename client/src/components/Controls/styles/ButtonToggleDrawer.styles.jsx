import styled from "styled-components";
export const ToggleDrawerContainer = styled.div`
  width : 40px; 
  height :40px;
  display : flex ;   
  flex-direction : column;
  justify-content : space-around ;
  align-items : center;
  border : 2px solid #454545 ; 
  border-radius : 5px;  
  padding : 5px;
  cursor : pointer;  
  &:hover{
    background-color : black;    
  }
  &:hover > *{
    background-color : white;
  }
`

export const Dash = styled.span`
  width: 80% ;
  height : 2.5px ;
  background-color : black; 
`