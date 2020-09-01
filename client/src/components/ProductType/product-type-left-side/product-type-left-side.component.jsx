import React from 'react'
import {ProductTypeLeftSideWrapper} from "./product-type-left-side.styles";
import PriceScope from "../../Layout/price-scope/price-scope.component";
import StarScope from "../../Layout/star-scope/star-scope.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectProductGroupList, selectMaxPrice, selectManufactorList} from  "../../../redux/product-type/product-type.selectors";
import LeftSideMenu from '../../Layout/left-side-menu/left-side-menu.component';
const ProductTypeLeftSide = ({mobileView, tabletView, productGroupList, maxPrice,manufactorList}) => {   
  return (
    <ProductTypeLeftSideWrapper>   
      {productGroupList.length ? <LeftSideMenu title="DS Nhóm SP" list={productGroupList}/> : null}    
      {manufactorList.length ? <LeftSideMenu title="Thương hiệu hàng đầu" list={manufactorList}/> : null}          
      <PriceScope mobileView={mobileView} tabletView={tabletView} maxPrice={maxPrice}/>   
      <StarScope mobileView={mobileView} tabletView={tabletView}/>  
    </ProductTypeLeftSideWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  productGroupList : selectProductGroupList, 
  maxPrice : selectMaxPrice,
  manufactorList : selectManufactorList
})

export default connect(mapStateToProps)(ProductTypeLeftSide)
