import React from 'react'
import {ProductGroupLeftSideWrapper} from "./product-group-left-side.styles";
import PriceScope from "../../Layout/price-scope/price-scope.component";
import StarScope from "../../Layout/star-scope/star-scope.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectMaxPrice} from  "../../../redux/product-group/product-group.selectors";
const ProductGroupLeftSide = ({mobileView, tabletView, maxPrice}) => {  
  return (
    <ProductGroupLeftSideWrapper>                  
      <PriceScope mobileView={mobileView} tabletView={tabletView} maxPrice={maxPrice}/>   
      <StarScope mobileView={mobileView} tabletView={tabletView}/>  
    </ProductGroupLeftSideWrapper>
  )
}

const mapStateToProps = createStructuredSelector({  
  maxPrice : selectMaxPrice, 
})

export default connect(mapStateToProps)(ProductGroupLeftSide)
