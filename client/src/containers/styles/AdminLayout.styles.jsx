import styled from "styled-components";

export const Wrapper = styled.div`
  width : 100vw;     
`

export const Sidebar = styled.div`
  height: 100vh;
  overflow : auto;  
  width : ${({open}) => open ? "320px" : "0"};  
  @media screen and (min-width:992px){
    width : ${({open}) => open ? "25%" : "0"};
  }
  border-right: 1px solid var(--light-gray-3);
  box-shadow : var(--lightShadow);
  transition : var(--mainTransition);
  ${({open}) => open ? `
    width : auto;
    visibility : visible; 
    opacity : 1; 
  ` : `
    width : 0;
    visibility : hidden ; 
    opacity : 0 ;
    transition : var(--mainTransition);
  `} ;
  position : fixed; 
  left: 0;
`

export const MainContent = styled.div` 
  height: 100vh;
  overflow : auto;
  width : ${({scale}) => scale ? "calc(100% - 320px)" : "100%"};
  margin-left:  ${({scale}) => scale ? "320px" : "0"};
  @media screen and (min-width: 992px){
    width : ${({scale}) => scale ? "calc(75%)" : "100%"};
  margin-left:  ${({scale}) => scale ? "25%" : "0"};
  }
`

export const ToggleDrawer = styled.div`
  position : fixed;
  display : ${({open}) => open ? "block" : "none"};
  left: 1rem; 
  top : 0.25rem;
`

export const ButtonClose = styled.button`
  position : absolute;
  right : 1rem;
  top : 1rem;
  outline : none ; 
  border: none ;   
  cursor : pointer;
  font-size : 1.4rem;
  width : 2rem;
  height : 2rem;
  border-radius : 50%; 
  background-color : var(--light-gray-1);
  display : flex;
  justify-content : center;
  align-items : center;
  color : var(--gray);
  &:hover{
    background-color : var(--light-gray-2);
  }
`