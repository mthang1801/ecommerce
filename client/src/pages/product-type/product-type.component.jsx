import React, { useEffect } from "react";
import { ProductTypeWrapper } from "./product-type.styles";
import { default as ProductTypeOverview } from "../../components/ProductType/product-type-overview/product-type-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import Background from "../../components/Layout/background/background.component";
import { fetchProductType } from "../../redux/product-type/product-type.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductTypeError,
  selectProductTypeLoading,
  selectProductTypeList,
  selectProductFetched,
  selectName,
  selectProductsIsFilter,
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
  name,
}) => {
  useEffect(() => {
    let { productTypeId } = match.params;
    const urlParams = new URLSearchParams(window.location.search);
    const min_price = +urlParams.get("min_price");
    const max_price = +urlParams.get("max_price");
    const page = +urlParams.get("page") || 1;

    fetchProductType(productTypeId, +min_price, +max_price, page);
  }, [
    fetchProductType,
    fetchProductList,
    location.search,
    window.location.search,
    match.params.categoryPath,
    match.params.productTypePath,
  ]);
  if (error && error.status == 404) {
    return <PageNotFound />;
  }
  if (!loading && name)
    return (
      <ProductTypeWrapper>
        <MasterHeader />
        <Background
          label={`Trang chủ / Danh mục sản phẩm / Loại sản phẩm / ${name}`}
        />
        <ProductTypeOverview />
      </ProductTypeWrapper>
    );
  return <Loader />;
};

const mapStateToProps = createStructuredSelector({
  error: selectProductTypeError,
  loading: selectProductTypeLoading,
  productTypeList: selectProductTypeList,
  fetched: selectProductFetched,
  name: selectName,
  isFilter: selectProductsIsFilter,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductType: (productTypeId, min_price, max_price, page) =>
    dispatch(fetchProductType(productTypeId, min_price, max_price, page)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductTypePage);
