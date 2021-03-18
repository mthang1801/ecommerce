import styled from "styled-components";

export const HeaderLargeViewPort = styled.nav`
  display: none;
  @media screen and (min-width: 992px) {
    width: 100%;
    height: 60px;
    background-color: rgba(200, 200, 200, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5rem;
    font-size: 0.9em;
  }
`;

export const HeaderSmallViewPort = styled.nav`
  display : flex;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
  width : 100% ; 
  height: 60px;  
  @media screen and (min-width: 992px){
    display : none ; 
  }
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items:center;  
  flex:  1 ; 
  overflow: hidden;
`;
export const HeaderRight = styled.div`  
  display: flex;
  justify-content: flex-end;
  align-items: center;

`;

export const HeaderItem = styled.div`
  padding: 0 1rem;
  &:not(:first-child) {
    border-left: 1px solid #ccc;
  }
  width: auto;
  height: 100%;
  display: none ; 
  align-items: center;
  & > a {
    padding: 0;
  }
  @media screen and (min-width : 992px){
    display : flex;
  }
`;

export const Icons = styled.div`
  margin: 0 1rem;
  transform: scale(1.5);
  display: flex;
  &:hover {
    cursor: pointer;
  }
  & > * {
    padding: 0 0.2rem;
  }
`;

export const Logout = styled.span`
  cursor: pointer;
`;
export const User = styled.div`
  display: flex;
  cursor: pointer;
  &:hover {
    color: #7fad39 !important;
  }
`;
export const Avatar = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid #ccc;
  margin-right: 7px;
`;
