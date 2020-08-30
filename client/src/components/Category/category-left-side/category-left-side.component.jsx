import React from 'react'
import {ShopGridLeftSideContainer} from "./category-left-side.styles";
import Department from "../department/department.component";
import PriceScope from "../price-scope/price-scope.component";
import StarScope from "../star-scope/star-scope.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectProductTypeList, selectMaxPrice, selectLatestProductList} from  "../../../redux/category/category.selectors";
const ShopGridLeftSide = ({mobileView, tabletView, productTypeList, maxPrice, latestProductList}) => {   
  return (
    <ShopGridLeftSideContainer>   
      <Department productTypeList={productTypeList}/>
      <PriceScope mobileView={mobileView} tabletView={tabletView} maxPrice={maxPrice}/>   
      <StarScope mobileView={mobileView} tabletView={tabletView}/>  
    </ShopGridLeftSideContainer>
  )
}

const mapStateToProps = createStructuredSelector({
  productTypeList : selectProductTypeList,
  maxPrice : selectMaxPrice,
  latestProductList : selectLatestProductList
})

export default connect(mapStateToProps)(ShopGridLeftSide)
