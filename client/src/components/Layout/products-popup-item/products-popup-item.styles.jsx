import styled from "styled-components";
import {Link} from "react-router-dom";
export const ProductsPopupItemContainer = styled.div`
  display : flex ; 
  flex-direction : column;
  font-size : 0.9em;
  padding : .5rem;
  width : 20%;
  height: 45%; 
  flex-wrap : wrap;
  overflow : hidden;
`

export const Label = styled.h4`
  font-weight  : bold ; 

`
export const CustomLink = styled(Link)`
  color : inherit ; 
  width : 100%;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  &:hover{
    text-decoration : underline;
  }
`