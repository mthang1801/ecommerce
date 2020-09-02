import React, { useEffect } from "react";
import { ManufactorWrapper } from "./manufactor.styles";
import { default as ManufactorOverview } from "../../components/Manufactor/manufactor-overview/manufactor-overview.container";
import MasterHeader from "../../components/Layout/master-header/master-header.component";
import Background from "../../components/Layout/background/background.component";
import {
  fetchManufactor,
  fetchProductList,
} from "../../redux/manufactor/manufactor.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectManufactorError,
  selectManufactorLoading,
  selectProductFetched,
  selectName,
} from "../../redux/manufactor/manufactor.selectors";
import PageNotFound from "../page-not-found/page-not-found.component";
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
}) => {
  useEffect(() => {   
    let page = +location.search.split("=")[1] || 1;       
    let { manufactorUrl } = match.params;  
    console.log(manufactorUrl);
    if (location.search && fetched) {
      fetchProductList(manufactorUrl, page);
      return;
    } 
    fetchManufactor(manufactorUrl, page);
  }, [
    fetchManufactor,
    fetchProductList,
    location.search,
    match.params.manufactorUrl,
  ]);
  if (loading) {
    return <Loader />;
  }
  if (error && error.status == 404) {
    return <PageNotFound />;
  }
  return (
    <ManufactorWrapper>
      <MasterHeader />
      <Background label={name} />
      <ManufactorOverview />
    </ManufactorWrapper>
  );
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
});
export default connect(mapStateToProps, mapDispatchToProps)(ManufactorPage);
