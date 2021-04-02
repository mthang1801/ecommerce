import styled from "styled-components";

export const DesktopContainer = styled.div`
  display: none;
  width: 0 ;
  height: 0; 
  @media screen and (min-width: 992px) {
    display: flex;
    width: 100%;
    height: 80px;

    align-items: center;
    padding: 0 5rem;
    margin: auto;    
    position: relative;
  }
`;

export const LeftSide = styled.div`
  min-width : 3rem;
  position: relative;  
`;
export const MidSide = styled.div`  
  display: flex;
  flex : 1 ;
  height: 100%;
  align-items: center;
  justify-content: space-around; 
`;
export const RightSide = styled.div`
  max-width: 25%;
  min-width: 20%;
  height: 100%;
`;

export const SmallerViewPort = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  @media screen and (min-width: 992px) {
    display: none;
    width: 0; 
    margin-bottom: 0;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  padding: 2rem;
  justify-content: ${(props) =>
    props.justifyBetween ? "space-between" : "center"};
  position: relative;
`;

export const LogoImage = styled.div`
  width: 100%;
  & > img {
    width: 100%;
  }
`;
