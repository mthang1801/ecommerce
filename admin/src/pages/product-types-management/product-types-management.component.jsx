import React, {useEffect} from 'react'
import {ProductTypesWrapper} from "./product-types-management.styles"
import Toolbar from "../../components/ProductTypes/toolbar/toolbar.component";
import {default as AddProductTypes} from "../../components/ProductTypes/add-category/add-product-types.container";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {fetchCategoryList} from "../../redux/category/category.actions"
const ProductTypes = ({match, fetchCategoryList}) => {
  useEffect( () => {fetchCategoryList()} ,[fetchCategoryList])
  return (
    <ProductTypesWrapper>
      <Toolbar/>
      <Route path={`${match.path}/add-product-types`} component={AddProductTypes}/>
    </ProductTypesWrapper>
  )
}

const mapDispatchToProps = dispatch => ({
  fetchCategoryList : () => dispatch(fetchCategoryList())
})


export default connect(null, mapDispatchToProps)(ProductTypes)
