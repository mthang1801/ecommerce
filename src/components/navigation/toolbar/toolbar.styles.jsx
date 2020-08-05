import styled from "styled-components";

export const ToolbarContainer = styled.nav`
  width : 100% ; 
  height : 50px;
  background-color : rgba(200,200,200,0.2);
  display : flex ;
  justify-content : space-between;
  align-items : center;
  padding : 0 5rem;
  font-size : .9em;
`

export const ToolbarLeft = styled.div`
  display : flex ; 
  width : 40% ; 
  overflow : hidden;

`
export const ToolbarRight = styled.div`
  display : flex ;   
  justify-content : flex-end; 
  align-items : center;
  width : 60%;
`

export const ToolbarItem = styled.div`  
  padding : 0 1rem;
  &:not(:last-child){
    border-right : 1px solid #ccc;
  }
  height : 100%; 
  display : flex ; 
  align-items : center;
`

export const Icons = styled.div`
  margin : 0 1rem;
  transform : scale(1.5); 
  display : flex ;   
  &:hover {
    cursor : pointer
  }
  & > * {
    padding : 0 .2rem;
  }
`
