import React, { useEffect } from "react";
import { ProductGroupWrapper } from "./product-group.styles";
import { default as ProductGroupOverview } from "../../components/ProductGroup/product-group-overview/product-group-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import Background from "../../components/Layout/background/background.component";
import {
  fetchProductGroup,
  fetchProductList,
} from "../../redux/product-group/product-group.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {  
  selectProductFetched,
  selectProductGroupError,
  selectProductGroupLoading,
  selectName
} from "../../redux/product-group/product-group.selectors";
import PageNotFound from "../page-not-found/page-not-found.component";
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
}) => {
  useEffect(() => {
    let page = +location.search.split("=")[1] || 1;    
    let { categoryPath, productTypePath, productGroupPath } = match.params;    
   
    if (location.search && fetched) {
      fetchProductList(categoryPath, productTypePath, productGroupPath, page);
      return;
    }
    fetchProductGroup(categoryPath, productTypePath, productGroupPath, page);
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
      <Background label={name} />
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductGroupPage);
