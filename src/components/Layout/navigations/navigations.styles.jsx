import styled from "styled-components";

export const DesktopContainer = styled.div`
  width : 100% ; 
  height: 80px;  
  display : flex ; 
  align-items : center;
  padding : 0 5rem ; 
  margin : auto ; 
`

export const LeftSide = styled.div`
  width : 15%;
`
export const MidSide = styled.div` 
  width : 60%;
  display : flex ; 
  height : 100%;
  align-items:center;
  justify-content : center;
`
export const RightSide = styled.div`
  width : 25%;
  height : 100%;
  display : flex ; 
  justify-content : center;
  align-items:center; 
 
`

export const SmallerViewPort = styled.div`
  width : 100%;
  display : flex ;
  flex-direction : column;  
  margin : auto;
`

export const Row = styled.div`
  display : flex;    
  width : 100%;
  height : 60px;
  align-items : center;
  padding  : 2rem;
  justify-content : ${(props) => props.justifyBetween ? "space-between" : "center" }
`