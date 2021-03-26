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
    background-color: var(--light-gray-1);
  }
  & span {
    margin: 0 0.2rem;
    display: flex;
    align-items: center;
  }
  & svg {
    font-size: 1.4rem;
  }
  background-color: ${({ active }) =>
    active ? "var(--light-gray-1)" : "white"};
`;

export const Navigations = styled.div`
  margin-left: ${({ openSidebar }) => (openSidebar ? 0 : "5rem")};
  display: flex;
  height: 100%;
  align-items: center;
  background-color: white;
`;
