import React from "react";
import { Wrapper } from "./styles/AdminSearch.styles";
import { FaSearch } from "react-icons/fa";
const AdminSearch = ({ searchValue, setSearchValue }) => {
  return (
    <Wrapper>
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button>
        <FaSearch />
      </button>
    </Wrapper>
  );
};

export default AdminSearch;
