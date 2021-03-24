import React, { useEffect, useState } from "react";
import { Wrapper } from "./styles/AdminPortfolioHome.styles";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectAdminPortfolioList,
  selectLoadingAdminPortfolioList,
} from "../../../redux/admin-portfolio/admin-portfolio.selector";
import SearchForm from "../../Search/AdminSearch";
import ListTableCategory from "./ListPortfolioCategory";
import { searchAdminPortfolio } from "../../../redux/admin-portfolio/admin-portfolio.actions";
const AdminPortfolioHome = ({ onSearch, adminCategoryList, isLoading }) => {
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (searchValue) {
      onSearch(searchValue);
    }
  }, [searchValue]);
  console.log(adminCategoryList);
  return (
    <Wrapper>
      <SearchForm
        searchValue={searchValue}
        setSearchValue={(val) => setSearchValue(val)}
      />
      <ListTableCategory data={adminCategoryList} isLoading={isLoading} />
    </Wrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  adminCategoryList: selectAdminPortfolioList,
  isLoading: selectLoadingAdminPortfolioList,
});

const mapDispatchToProps = (dispatch) => ({
  onSearch: (value) => dispatch(searchAdminPortfolio(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortfolioHome);
