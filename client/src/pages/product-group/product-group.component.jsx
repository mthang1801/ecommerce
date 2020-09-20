import React, { useEffect } from "react";
import { ProductGroupWrapper } from "./product-group.styles";
import { default as ProductGroupOverview } from "../../components/ProductGroup/product-group-overview/product-group-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import Background from "../../components/Layout/background/background.component";
import {
  fetchProductGroup,
  fetchProductList,
  filterProductsByPrice
} from "../../redux/product-group/product-group.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {  
  selectProductFetched,
  selectProductGroupError,
  selectProductGroupLoading,
  selectName
} from "../../redux/product-group/product-group.selectors";
import PageNotFound from "../page-error/page-error.component";
import Loader from "../../components/UI/loader/loader.component";
const ProductGroupPage = ({
  match,
  location,
  fetchProductGroup,
  fetchProductList,
  loading,
  error,
  fetched,
  name,
  filterProductsByPrice
}) => {
  useEffect(() => {    
    let { categoryPath, productTypePath, productGroupPath } = match.params;    
    const urlParams = new URLSearchParams(window.location.search);
    const min_price = +urlParams.get("min_price");
    const max_price = +urlParams.get("max_price");
    const page = +urlParams.get("page") || 1 ; 
    if (location.search && fetched && !max_price && !min_price) {
      fetchProductList(categoryPath, productTypePath, productGroupPath, page);
      return;
    } 
    if(max_price > 0){           
      filterProductsByPrice(categoryPath, productTypePath,productGroupPath, min_price, max_price, page);
    }else{      
      fetchProductGroup(categoryPath, productTypePath, productGroupPath, page);
    }
  
  }, [
    fetchProductGroup,
    fetchProductList,
    location.search,
    match.params.categoryPath,
    match.params.productTypePath,
    match.params.productGroupPath
  ]);
  if (loading) {
    return <Loader />;
  }
  if (error && error.status == 404) {
    return <PageNotFound />;
  }
  return (
    <ProductGroupWrapper>
      <MasterHeader />
      <Background label={`Trang chủ / Danh mục sản phẩm / Loại sản phẩm / Nhóm sản phẩm / ${name}`} />
      <ProductGroupOverview />
    </ProductGroupWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectProductGroupError,
  loading: selectProductGroupLoading,  
  fetched: selectProductFetched,
  name: selectName,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductGroup: (categoryPath, productTypePath, productGroupPath, page) => dispatch(fetchProductGroup(categoryPath, productTypePath, productGroupPath, page)),
  fetchProductList: (categoryPath, productTypePath, productGroupPath, page) => dispatch(fetchProductList(categoryPath, productTypePath, productGroupPath, page)),
  filterProductsByPrice : (categoryPath, productTypePath, productGroupPath, minPrice, maxPrice, page) => dispatch(filterProductsByPrice(categoryPath, productTypePath, productGroupPath, minPrice, maxPrice, page))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductGroupPage);
