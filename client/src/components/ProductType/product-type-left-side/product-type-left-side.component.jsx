import React, { useState, useEffect } from "react";
import { ProductTypeLeftSideWrapper } from "./product-type-left-side.styles";
import PriceScope from "../../Layout/price-scope/price-scope.component";
import StarScope from "../../Layout/star-scope/star-scope.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductGroupList,
  selectMaxPrice,
  selectManufactorList,
} from "../../../redux/product-type/product-type.selectors";
import {filterProductsByPrice} from "../../../redux/product-type/product-type.actions"
import LeftSideMenu from "../../Layout/left-side-menu/left-side-menu.component";
import {withRouter} from "react-router-dom"
const ProductTypeLeftSide = ({
  mobileView,
  tabletView,
  productGroupList,
  maxPrice,
  manufactorList,
  match,
  history
}) => {
  const [minPriceChange, setMinPriceChange] = useState(0);
  const [maxPriceChange, setMaxPriceChange] = useState(maxPrice);
  const [filter, setFilter] = useState(false);
  useEffect(() => {  
    let categoryPath = match.url.split("/")[1];
    let productTypePath= match.url.split("/")[2];    
    let page = +match.params.page || 1;    
    if(filter){     
      history.push(`/${categoryPath}/${productTypePath}/products?page=${page}&min_price=${minPriceChange}&max_price=${maxPriceChange}`);      
    }
  }, [filter,minPriceChange, maxPriceChange])
  return (
    <ProductTypeLeftSideWrapper>
      {productGroupList.length ? (
        <LeftSideMenu title="DS Nhóm SP" list={productGroupList} />
      ) : null}
      {manufactorList.length ? (
        <LeftSideMenu title="Thương hiệu hàng đầu" list={manufactorList} />
      ) : null}
      <PriceScope
        mobileView={mobileView}
        tabletView={tabletView}
        maxPrice={maxPrice}      
        setMinPriceChange={(value) => setMinPriceChange(value)}
        setMaxPriceChange={(value) => setMaxPriceChange(value)}
        setFilter={() => setFilter(true)}
      />
      <StarScope mobileView={mobileView} tabletView={tabletView} />
    </ProductTypeLeftSideWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  productGroupList: selectProductGroupList,
  maxPrice: selectMaxPrice,
  manufactorList: selectManufactorList,
});

const mapDispatchToProps = dispatch => ({
  filterProductsByPrice : (categoryPath, productTypePath, minPrice, maxPrice, page) => dispatch(filterProductsByPrice(categoryPath, productTypePath, minPrice, maxPrice, page))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProductTypeLeftSide));
