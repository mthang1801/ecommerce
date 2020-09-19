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
  &:not(:first-child){
    border-left : 1px solid #ccc;
  }  ;
  width : auto;
  height : 100%; 
  display :  ${({mediumView}) => mediumView ? "none" : "flex"} ; 
  align-items : center;  
  & > a{
    padding : 0;
  }
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

export const Logout = styled.span`
  cursor : pointer ; 
`
export const User = styled.div`
  display : flex;   
  cursor : pointer; 
  &:hover{
    color : #7fad39 !important;
  }
`
export const Avatar = styled.img`
  width : 1.5rem; 
  height: 1.5rem ; 
  border-radius: 50%;
  border : 1px solid #ccc;
  margin-right : 7px;
`