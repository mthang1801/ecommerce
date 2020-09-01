import React from 'react'
import {CategoryLeftSideWrapper} from "./category-left-side.styles";
import PriceScope from "../../Layout/price-scope/price-scope.component";
import StarScope from "../../Layout/star-scope/star-scope.component";
import LeftSideMenu from "../../Layout/left-side-menu/left-side-menu.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectProductTypeList, selectMaxPrice} from  "../../../redux/category/category.selectors";
const CategoryLeftSide = ({mobileView, tabletView, productTypeList, maxPrice,}) => {   
  return (
    <CategoryLeftSideWrapper>   
      {productTypeList.length && <LeftSideMenu title="Danh mục Sản phẩm" list={productTypeList}/>}
      <PriceScope mobileView={mobileView} tabletView={tabletView} maxPrice={maxPrice}/>   
      <StarScope mobileView={mobileView} tabletView={tabletView}/>  
    </CategoryLeftSideWrapper>
  ) 
}

const mapStateToProps = createStructuredSelector({
  productTypeList : selectProductTypeList,
  maxPrice : selectMaxPrice
})

export default connect(mapStateToProps)(CategoryLeftSide)
