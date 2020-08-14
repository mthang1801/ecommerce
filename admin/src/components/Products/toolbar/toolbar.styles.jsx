import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const ToolbarContainer = styled.div`
  width : 100%; 
  display : flex ; 
  height:  2.5rem ; 
  background-color : #f1f1f1;
`

export const CustomNavLink = styled(NavLink)`
  padding : 0.5rem 1rem;
  display : flex ;
  align-items : center;
`