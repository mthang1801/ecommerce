import React, { useEffect } from "react";
import { ProductsWrapper } from "./products-management.styles";
import Toolbar from "../../components/Products/toolbar/toolbar.component";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCategoryList } from "../../redux/category/category.actions";
import { fetchProducts } from "../../redux/products/products.actions";
import {default as IndexProducts} from "../../components/Products/index-products/index-products.container";
import {default as AddProduct} from "../../components/Products/add-product/add-product.container"
const ProductTypes = ({ match, fetchCategoryList, fetchProducts}) => {
  useEffect(() => {    
    fetchCategoryList();     
    fetchProducts() ;
  }, [fetchCategoryList,fetchProducts]);
  return (
    <ProductsWrapper>
      <Toolbar />
      <Route path={`${match.path}`} exact component={IndexProducts}/>
      <Route
        path={`${match.path}/add-product`}
        component={AddProduct}
      />
    </ProductsWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCategoryList: () => dispatch(fetchCategoryList()),  
  fetchProducts : () => dispatch(fetchProducts())
});

export default connect(null, mapDispatchToProps)(ProductTypes);
