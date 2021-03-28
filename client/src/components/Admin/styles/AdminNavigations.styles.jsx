import styled from "styled-components";

export const Wrapper = styled.nav`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--gray-1);
  box-shadow: var(--lightShadow);  
  
`;
export const NativeLink = styled.span`
  padding: 0.5rem;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  &:hover {
    background: linear-gradient(to bottom, #bbdefb , #90caf9);
  }
  & span {
    margin: 0 0.2rem;
    display: flex;
    align-items: center;
  }
  & svg {
    font-size: 1.4rem;
  }
  background: ${({ active }) =>
    active ? "linear-gradient(to right, #bbdefb , #90caf9);" : "transaprent"};
  border-bottom : 5px solid ${({active}) => active ? "#fb8c00" : "transparent"};
`;

export const Navigations = styled.div`
  margin-left: ${({ openSidebar }) => (openSidebar ? 0 : "5rem")};
  display: flex;
  height: 100%;
  align-items: center;
  background: linear-gradient(to right, #64b5f6 25%,#90caf9 50%, #bbdefb 75% ,#e3f2fd 100%);
`;
