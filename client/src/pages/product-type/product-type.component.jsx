import React, { useEffect } from "react";
import { ProductTypeWrapper } from "./product-type.styles";
import { default as ProductTypeOverview } from "../../components/ProductType/product-type-overview/product-type-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import Background from "../../components/Layout/background/background.component";
import {
  fetchProductType,
  fetchProductList,
  filterProductsByPrice
} from "../../redux/product-type/product-type.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductTypeError,
  selectProductTypeLoading,
  selectProductTypeList,
  selectProductFetched,
  selectName,
  selectProductsIsFilter
} from "../../redux/product-type/product-type.selectors";
import PageNotFound from "../page-error/page-error.component";
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
  isFilter,
  filterProductsByPrice
}) => {
  useEffect(() => {
    // let page = +location.search.split("=")[1] || 1;    
    let { categoryPath, productTypePath } = match.params;        
    const urlParams = new URLSearchParams(window.location.search);
    const min_price = +urlParams.get("min_price");
    const max_price = +urlParams.get("max_price");
    const page = +urlParams.get("page") || 1 ; 
    console.log(isFilter,max_price ,min_price)    
    if (location.search && fetched && !max_price && !min_price) {
      fetchProductList(categoryPath, productTypePath, page);
      return;
    }
    if(max_price > 0){
      console.log(1)
      filterProductsByPrice(categoryPath, productTypePath, min_price, max_price, page);
    }else{
      console.log(2);
      fetchProductType(categoryPath, productTypePath, page);
    }
    
  }, [
    fetchProductType,
    fetchProductList,
    location.search,
    window.location.search,
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
      <Background label={`Trang chủ / Danh mục sản phẩm / Loại sản phẩm / ${name}`} />
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
  isFilter : selectProductsIsFilter
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductType: (categoryPath, productTypePath, page) => dispatch(fetchProductType(categoryPath, productTypePath, page)),
  fetchProductList: (categoryPath, productTypePath, page) => dispatch(fetchProductList(categoryPath, productTypePath, page)),
  filterProductsByPrice : (categoryPath, productTypePath, minPrice, maxPrice, page) => dispatch(filterProductsByPrice(categoryPath, productTypePath, minPrice, maxPrice, page))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductTypePage);
