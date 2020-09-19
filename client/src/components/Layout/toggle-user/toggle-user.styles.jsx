import styled from "styled-components";
export const ToggleUserContainer = styled.div`
  width : 100%;
  display : flex ; 
  align-items : center;
  cursor : pointer;   
  position :relative; 
  &:hover{
    color : #7fad39 !important; 
  }
`
export const Avatar = styled.img`
  width : 30px ; 
  height : 30px;
  margin-right : 0.5rem;  
  border-radius : 50%; 
  border : 1px solid #ccc;
`
export const Text = styled.span`
  margin-right : 0.5rem;
`

export const UserOptionsList = styled.div`
  position : absolute ; 
  top : 100%; 
  width : 100%;  
  background-color : #424242; 
  color : white ;
  display : flex ; 
  flex-direction : column;
  opacity : ${({show}) => show ? 1 : 0 };
  z-index : 400;
  visibility : ${({show}) => show ? "visible" : "hidden"};
  transition : all 0.25s;

`

export const RowInline = styled.div`
  display : flex ;  
  align-items : center;    
  padding : .5rem 1rem;

  &:not(:last-child){
    border-bottom : 1px solid #7fad39;
  }
  &:hover{
    background-color : #7fad39;
    color : white !important;
  }
`

export const Logout = styled.span`
  cursor : pointer;   
`