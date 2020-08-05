import styled from "styled-components";

export const HeaderContainer = styled.div`
  width : 100% ; 
  height: 80px;
  font-size : 1.1em;
  display : flex ; 
  align-items : center;
  padding : 0 5rem ; 
  margin : auto ; 
`

export const LeftSide = styled.div`
  flex : 1 0 25%;
`
export const MidSide = styled.div` 
  flex : 2 0 50%;
  display : flex ; 
  height : 100%;
  align-items:center;
  justify-content : center;
`
export const RightSide = styled.div`
  flex : 1 0 25%;
  height : 100%;
  display : flex ; 
  justify-content : center;
  align-items:center;
 
`
export const LogoContainer = styled.div`
  max-width : 5rem ; 
  height : 100%;
`
export const LogoImage = styled.img`
  width : 100%;
  height : 100%;
`

export const Option = styled.span`
  padding : 0 1rem;
`

export const CartPrice = styled.span`
  font-weight : bold ;  
  font-size : .9em;
`