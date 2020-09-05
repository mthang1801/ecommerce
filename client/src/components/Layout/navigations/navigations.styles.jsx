import styled from "styled-components";

export const DesktopContainer = styled.div`
  width : 100% ; 
  height: 80px;  
  display : flex ; 
  align-items : center;
  padding : 0 5rem ; 
  margin : auto ; 
  font-family: Roboto ,"sans serif";
  position : relative;
`

export const LeftSide = styled.div`
  width : 25%;
`
export const MidSide = styled.div` 
  width : 50%;
  display : flex ; 
  height : 100%;
  align-items:center;
  justify-content : center;
`
export const RightSide = styled.div`
  width : 25%;
  height : 100%;  
`

export const SmallerViewPort = styled.div`
  width : 100%;
  display : flex ;
  flex-direction : column;  
  margin : 2rem auto;
`

export const Row = styled.div`
  display : flex;    
  width : 100%;
  height : 60px;
  align-items : center;
  padding  : 2rem;
  justify-content : ${(props) => props.justifyBetween ? "space-between" : "center" };
  position :relative;
`