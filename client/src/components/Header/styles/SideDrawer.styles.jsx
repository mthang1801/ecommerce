import styled, {keyframes} from "styled-components";

export const SideDrawerContainer = styled.div`
  width : 100%; 
  height : 100%; 
  visibility : ${({show}) => show ? "visible" : "hidden"};
  transition : visibility .3s;  
  @media screen and (min-width: 992px){
    display : none ; 
  }
`

export const DrawerMenu = styled.div`
  position : fixed ;
  top : 0 ;    
  height : 100%;
  display: flex ;   
  width : 320px;  
  flex-direction : column;
  padding : 12px 16px;
  border-right : 1px solid  #ccc; 
  background-color : white ; 
  z-index : 9999;
  animation-name : ${({show}) => show ? openDrawer : closeDrawer };
  animation-duration : 0.5s;
`
const openDrawer = keyframes`
  0%{
    width : 0;
    opacity : 0 ; 
  }
  100%{   
    width : 300px;
    opacity : 1 ;
  }
`

const closeDrawer = keyframes`
  0%{   
    min-width : 300px;
    opacity : 1 ; 
  }
  30%{
    opacity : .1;
  }
  100%{
    width : 0px;
    opacity : 0 ;
  }
`
