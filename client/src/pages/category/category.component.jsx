import React, { useEffect, useRef } from "react";
import { CategoryPageWrapper } from "./category.styles";
import { default as CategoryOverview } from "../../components/Category/category-overview/category-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import PageError from "../page-error/page-error.component";
import Background from "../../components/Layout/background/background.component";
import {
  fetchCategory,
  fetchProductList,
  filterProductsByPrice,
} from "../../redux/category/category.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCategoryError,
  selectCategoryLoading,
  selectCategoryList,
  selectProductFetched,
} from "../../redux/category/category.selectors";
import Loader from "../../components/UI/loader/loader.component";
const CategoryPage = ({
  match,
  fetchCategory,
  location,
  error,
  loading,
  categoryList,
  fetchProductList,
  fetched,
  filterProductsByPrice,
}) => {
  const categoryRef = useRef(null)
  useEffect(() => {    
    const urlParams = new URLSearchParams(window.location.search);
    const min_price = +urlParams.get("min_price");
    const max_price = +urlParams.get("max_price");
    const page = +urlParams.get("page") || 1;    
    let categoryPath = match.params.categoryPath;
    if (location.search && fetched && !max_price && !min_price) {
      fetchProductList(categoryPath, page);
      return;
    }
    if (+max_price > 0) {
      filterProductsByPrice(categoryPath, +min_price, +max_price, page);
    } else {
      fetchCategory(categoryPath, page);
    }    
  }, [fetchCategory, location.search, match.params.categoryPath, match.url]);
 
  if (error) {
    return <PageError error={error.msg} />;
  }
  if (!loading && categoryList) {
    return (
      <CategoryPageWrapper ref={categoryRef}>
        <MasterHeader />
        <Background
          label={`Trang chủ/ Danh mục sản phẩm/ ${categoryList.name }`}
        />
        <CategoryOverview />
      </CategoryPageWrapper>
    );
  }
  return <Loader/>
  
};

const mapStateToProps = createStructuredSelector({
  error: selectCategoryError,
  loading: selectCategoryLoading,
  categoryList: selectCategoryList,
  fetched: selectProductFetched,
});
const mapDispatchToProps = (dispatch) => ({
  fetchCategory: (path, page) => dispatch(fetchCategory(path, page)),
  fetchProductList: (path, page) => dispatch(fetchProductList(path, page)),
  filterProductsByPrice: (path, minPrice, maxPrice, page) =>
    dispatch(filterProductsByPrice(path, minPrice, maxPrice, page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
