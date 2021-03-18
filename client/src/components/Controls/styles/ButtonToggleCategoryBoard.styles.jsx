import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    color: var(--blue-1);
    & span {
      background-color: var(--blue-1);
    }
  }
  color : ${({active}) => active && "var(--blue-1)"} ;  
  & div:last-child {
    font-size: 0.8rem;
    display: flex;
    align-items: flex-end;
  }
  align-items: flex-end;
  z-index: 1000;
`;
export const CategoryIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;  
  
  & span {
    height: 2px;
    background-color: ${({active}) => active ? "var(--blue-1)" : "black"};
    margin-bottom: 0.25rem;
  }
  & span:first-child {
    width: 1.25rem;
  }
  & span:nth-of-type(2) {
    width: 1rem;
  }
  & span:last-child {
    width: 0.75rem;
  }
`;
