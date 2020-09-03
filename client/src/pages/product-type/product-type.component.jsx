import React, { useEffect } from "react";
import { ProductTypeWrapper } from "./product-type.styles";
import { default as ProductTypeOverview } from "../../components/ProductType/product-type-overview/product-type-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import Background from "../../components/Layout/background/background.component";
import {
  fetchProductType,
  fetchProductList,
} from "../../redux/product-type/product-type.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductTypeError,
  selectProductTypeLoading,
  selectProductTypeList,
  selectProductFetched,
  selectName,
} from "../../redux/product-type/product-type.selectors";
import PageNotFound from "../page-not-found/page-not-found.component";
import Loader from "../../components/UI/loader/loader.component";
const ProductTypePage = ({
  match,
  location,
  fetchProductType,
  fetchProductList,
  loading,
  error,
  fetched,
  name,
}) => {
  useEffect(() => {
    let page = +location.search.split("=")[1] || 1;    
    let { categoryPath, productTypePath } = match.params;
    if (location.search && fetched) {
      fetchProductList(categoryPath, productTypePath, page);
      return;
    }
    fetchProductType(categoryPath, productTypePath, page);
  }, [
    fetchProductType,
    fetchProductList,
    location.search,
    match.params.categoryPath,
    match.params.productTypePath,
  ]);
  if (loading) {
    return <Loader />;
  }
  if (error && error.status == 404) {
    return <PageNotFound />;
  }
  return (
    <ProductTypeWrapper>
      <MasterHeader />
      <Background label={name} />
      <ProductTypeOverview />
    </ProductTypeWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  error: selectProductTypeError,
  loading: selectProductTypeLoading,
  productTypeList: selectProductTypeList,
  fetched: selectProductFetched,
  name: selectName,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductType: (categoryPath, productTypePath, page) => dispatch(fetchProductType(categoryPath, productTypePath, page)),
  fetchProductList: (categoryPath, productTypePath, page) => dispatch(fetchProductList(categoryPath, productTypePath, page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductTypePage);
