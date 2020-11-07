import React, {useState, useEffect} from "react";
import { CategoryLeftSideWrapper } from "./category-left-side.styles";
import PriceScope from "../../Layout/price-scope/price-scope.component";
import StarScope from "../../Layout/star-scope/star-scope.component";
import LeftSideMenu from "../../Layout/left-side-menu/left-side-menu.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductTypeList,
  selectMaxPrice,
} from "../../../redux/category/category.selectors";
import { withRouter } from "react-router-dom";
const CategoryLeftSide = ({
  mobileView,
  tabletView,
  productTypeList,
  maxPrice,
  match,
  history
}) => {
  const [minPriceChange, setMinPriceChange] = useState(0);
  const [maxPriceChange, setMaxPriceChange] = useState(maxPrice);
  const [filter, setFilter] = useState(false);
  useEffect(() => {       
    let page = +match.params.page || 1;        
    if(filter){     
      history.push(`${match.url}?page=${page}&min_price=${minPriceChange}&max_price=${maxPriceChange}`);      
      setFilter(false);
    }
  }, [filter,minPriceChange, maxPriceChange])
  return (
    <CategoryLeftSideWrapper>
      {productTypeList.length && (
        <LeftSideMenu title="Danh mục Sản phẩm" list={productTypeList} />
      )}
      <PriceScope
        mobileView={mobileView}
        tabletView={tabletView}
        maxPrice={maxPrice}
        setMinPriceChange={(value) => setMinPriceChange(value)}
        setMaxPriceChange={(value) => setMaxPriceChange(value)}
        setFilter={() => setFilter(true)}
      />
      <StarScope mobileView={mobileView} tabletView={tabletView} />
    </CategoryLeftSideWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  productTypeList: selectProductTypeList,
  maxPrice: selectMaxPrice,
});

export default connect(mapStateToProps)(withRouter(CategoryLeftSide));
