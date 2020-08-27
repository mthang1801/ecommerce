import styled from "styled-components";
import {Link} from "react-router-dom";
export const ProductsPopupItemContainer = styled.div`
  display : flex ; 
  flex-direction : column;
  font-size : 0.9em;
  padding : .5rem;
  width : 32%;
  max-height: 100%; 
  margin : 1rem ;
  flex-wrap : wrap;
  overflow : hidden;
`

export const LinkProductType = styled(Link)`  
  font-weight : bold ; 
  color : #757575;
  font-size : 0.95em;
`
export const CustomLink = styled(Link)`
  color : inherit ; 
  width : 100%;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
  &:hover{
    text-decoration : underline;
  };
  font-size : 0.85em;
`