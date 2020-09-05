import React, { useEffect, useRef } from "react";
import { ShopDetailsContainer } from "./product-detail.styles";
import Background from "../../components/Layout/background/background.component";
import ProductDetailsOverview from "../../components/Product-Detail/product-details-overview/product-details-overview.component";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import { fetchProductDetail } from "../../redux/product-detail/product-detail.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductDetailData,
  selectProdudctDetailLoading,
  selectProductDetailError,
} from "../../redux/product-detail/product-detail.selectors";
import PageNotFound from "../page-not-found/page-not-found.component";
import Loader from "../../components/UI/loader/loader.component";
import { withRouter } from "react-router-dom";
const ShopDetailPage = ({
  product,
  location,
  match,
  fetchProductDetail,
  loading,
  error,
}) => {
  const productDetailRef = useRef(null);
  useEffect(() => {
    const categoryPath = match.params.categoryPath;
    const productTypePath = match.params.productTypePath;
    const productPath = match.params.productPath;
    fetchProductDetail(categoryPath, productTypePath, productPath);
    if(productDetailRef.current){
      window.scrollTo({
        top: productDetailRef.current.offsetTop , 
        behavior : "auto"
      })
    }
  }, [
    fetchProductDetail,
    match.params.categoryPath,
    match.params.productTypePath,
    match.params.productPath,
  ]);
  if (loading) {
    return <Loader />;
  }
  if (error && error.msg && !loading) {
    return <PageNotFound />;
  }
  return (
    <React.Fragment>
      {product ? (
        <ShopDetailsContainer ref={productDetailRef}>
          <MasterHeader />
          <Background label={product.label} />
          <ProductDetailsOverview/>
        </ShopDetailsContainer>
      ) : null}
    </React.Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  product: selectProductDetailData,
  loading: selectProdudctDetailLoading,
  error: selectProductDetailError,
});
const mapDispatchToProps = (dispatch) => ({
  fetchProductDetail: (categoryPath, productTypePath, productPath) =>
    dispatch(fetchProductDetail(categoryPath, productTypePath, productPath)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ShopDetailPage));