import React, { useEffect, useRef } from "react";
import { ManufactorWrapper } from "./manufactor.styles";
import { default as ManufactorOverview } from "../../components/Manufactor/manufactor-overview/manufactor-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import Background from "../../components/Layout/background/background.component";
import {
  fetchManufactor,
  fetchProductList,
  filterProductsByPrice
} from "../../redux/manufactor/manufactor.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectManufactorError,
  selectManufactorLoading,
  selectProductFetched,
  selectName,
} from "../../redux/manufactor/manufactor.selectors";
import PageNotFound from "../page-error/page-error.component";
import Loader from "../../components/UI/loader/loader.component";
const ManufactorPage = ({
  match,
  location,
  fetchManufactor,
  fetchProductList,
  loading,
  error,
  fetched,
  name,
  filterProductsByPrice
}) => {
  const manufactorRef = useRef(null);
  useEffect(() => {            
    let { manufactorPath } = match.params;  
    const urlParams = new URLSearchParams(window.location.search);
    const min_price = +urlParams.get("min_price");
    const max_price = +urlParams.get("max_price");
    const page = +urlParams.get("page") || 1;   
    if (location.search && fetched && !max_price && !min_price) {
      fetchProductList(manufactorPath, page);
      return;
    } 
    if (+max_price > 0) {
      filterProductsByPrice(manufactorPath, +min_price, +max_price, page);
    } else {
      fetchManufactor(manufactorPath, page);
    }       
  }, [
    fetchManufactor,
    fetchProductList,
    location.search,
    match.params.manufactorPath,
  ]);
  useEffect(() => {   
    if(manufactorRef.current){
      window.scrollTo({
        top : manufactorRef.current.offsetTop, 
        behavior : "auto"
      })
    }
  }, [match.url, window.location.search, manufactorRef])  
  if (error && error.status == 404) {
    return <PageNotFound />;
  }
  if(!loading && name )
  return (
    <ManufactorWrapper ref={manufactorRef}>
      <MasterHeader />
      <Background label={`Trang chủ / Nhà sản xuất / ${name}`} />
      <ManufactorOverview />
    </ManufactorWrapper>
  );
  return <Loader/>
};

const mapStateToProps = createStructuredSelector({
  error: selectManufactorError,
  loading: selectManufactorLoading, 
  fetched: selectProductFetched,
  name: selectName,
});
const mapDispatchToProps = (dispatch) => ({
  fetchManufactor: ( pathUrl, page) => dispatch(fetchManufactor( pathUrl, page)),
  fetchProductList: ( pathUrl, page) => dispatch(fetchProductList( pathUrl, page)),
  filterProductsByPrice : (pathUrl, minPrice, maxPrice, page) => dispatch(filterProductsByPrice(pathUrl, minPrice, maxPrice, page))
});
export default connect(mapStateToProps, mapDispatchToProps)(ManufactorPage);
