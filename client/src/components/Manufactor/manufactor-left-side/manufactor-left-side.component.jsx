import React from 'react'
import {ManufactorLeftSideWrapper} from "./manufactor-left-side.styles";
import PriceScope from "../../Layout/price-scope/price-scope.component";
import StarScope from "../../Layout/star-scope/star-scope.component";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {selectProductGroupList, selectMaxPrice} from  "../../../redux/manufactor/manufactor.selectors";
import LeftSideMenu from '../../Layout/left-side-menu/left-side-menu.component';
const ManufactorLeftSide = ({mobileView, tabletView, productGroupList, maxPrice}) => {     
  return (
    <ManufactorLeftSideWrapper>   
      {productGroupList.length ? <LeftSideMenu title="DS Nhóm SP" list={productGroupList}/> : null}          
      <PriceScope mobileView={mobileView} tabletView={tabletView} maxPrice={maxPrice}/>   
      <StarScope mobileView={mobileView} tabletView={tabletView}/>  
    </ManufactorLeftSideWrapper>
  )
}

const mapStateToProps = createStructuredSelector({
  productGroupList : selectProductGroupList, 
  maxPrice : selectMaxPrice,  
})

export default connect(mapStateToProps)(ManufactorLeftSide)
