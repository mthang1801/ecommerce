import React, { useState } from "react";
import {
  SearchForm,
  SearchInput,
  SearchButton,
} from "./styles/SearchHeaders.styles";
import { FaSearch } from "react-icons/fa";
const SearchHeader = () => {
  //only occure at small viewport
  const [openSearch, setOpenSearch] = useState(false);
  const onClickSearchButton = (e) => {
    setOpenSearch((prevState) => !prevState);
  };
  return (
    <SearchForm onSubmit={(e) => e.preventDefault()} open={openSearch}>
      <SearchInput type="text" placeholder="Search..." open={openSearch} />
      <SearchButton onClick={onClickSearchButton} open={openSearch}>
        <FaSearch />
      </SearchButton>
    </SearchForm>
  );
};

export default SearchHeader;
