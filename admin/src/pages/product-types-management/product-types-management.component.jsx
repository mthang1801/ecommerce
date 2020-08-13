import React, { useEffect } from "react";
import { ProductTypesWrapper } from "./product-types-management.styles";
import Toolbar from "../../components/ProductTypes/toolbar/toolbar.component";
import { default as AddProductTypes } from "../../components/ProductTypes/add-category/add-product-types.container";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategoryList } from "../../redux/category/category.actions";
import { fetchProductTypes } from "../../redux/product-types/product-types.actions";
import {default as IndexProductTypes} from "../../components/ProductTypes/index-product-types/index-product-types.container";
const ProductTypes = ({ match, fetchCategoryList, fetchProductTypes }) => {
  useEffect(() => {
    fetchCategoryList();
    fetchProductTypes();
    return () => {fetchCategoryList() ; fetchProductTypes()}
  }, [fetchCategoryList, fetchProductTypes]);
  return (
    <ProductTypesWrapper>
      <Toolbar />
      <Route path={`${match.path}`} exact component={IndexProductTypes}/>
      <Route
        path={`${match.path}/add-product-types`}
        component={AddProductTypes}
      />
    </ProductTypesWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryList: () => dispatch(fetchCategoryList()),
  fetchProductTypes: () => dispatch(fetchProductTypes()),
});

export default connect(null, mapDispatchToProps)(ProductTypes);
