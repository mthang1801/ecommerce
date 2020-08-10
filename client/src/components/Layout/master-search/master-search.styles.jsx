import styled from "styled-components";

export const MasterSearchContainer = styled.div`
  border: 1px solid #ccc;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  z-index: 300;
`;

export const CategoryTypes = styled.div`
  width: 25%;
  height: 100%;
  padding: 0 1rem;
  text-align: center;
  display : flex ;
  align-items :center ;
  justify-content: center; 
  & > * {
    padding : 0 .2rem;
  }
  overflow : hidden ;
  border-right: 1px solid #ccc;
`;
export const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
`;
export const SearchButton = styled.button`
  width: 25%;
  outline: none;
  border: none;
  height: 100%;
  font-size: 1em;
  color: white;
  background-color: #7fad39;
  padding: ${({ mobileView }) => (mobileView ? "0.2rem" : "0.5rem 1rem")};
  cursor: pointer;
  &:hover {
    background-color: #7fbf1d;
  }
  transition: all 0.25s;
`;
