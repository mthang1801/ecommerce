import React, { useEffect, useState } from "react";
import { Wrapper } from "./styles/AdminHome.styles";
import SearchForm from "../Search/AdminSearch";
import ListTable from "./ListTable";

const AdminHome = ({
  onSearch,
  listData,
  count,
  role,
  isLoading,
  cols,
  onRemove,
  onEdit,
  localesData
}) => {
  const [searchValue, setSearchValue] = useState("");  
  useEffect(() => {
    if (searchValue) {
      onSearch(searchValue);
    }
  }, [searchValue]);
  return (
    <Wrapper>
      <SearchForm
        searchValue={searchValue}
        setSearchValue={(val) => setSearchValue(val)}
      />
      <ListTable
        count={count}
        role={role}
        data={listData}
        isLoading={isLoading}
        cols={cols}
        onRemove={onRemove}
        onEdit={onEdit}  
        localesData={localesData}      
      />
    </Wrapper>
  );
};

export default AdminHome;
