import styled from "styled-components";
import {Link} from "react-router-dom"
export const Wrapper = styled.div`
  color : inherit;
  padding: 1rem;  
  
`

export const Title = styled(Link)`
  color: inherit ; 
  font-size : 0.95rem;
  font-weight: bold;
`

export const ListProductGroups = styled.div`
  display : flex;
  flex-direction: column;  
`

export const ProductGroupItem = styled(Link)`
  color : inherit;
  &:hover{
    background-color : var(--blue-1);
    color: white;
  }
  font-size : 0.9rem;
`