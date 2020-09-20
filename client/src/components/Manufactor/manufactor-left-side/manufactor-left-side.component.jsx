import React, { useState, useEffect } from "react";
import { ManufactorLeftSideWrapper } from "./manufactor-left-side.styles";
import PriceScope from "../../Layout/price-scope/price-scope.component";
import StarScope from "../../Layout/star-scope/star-scope.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectProductGroupList,
  selectMaxPrice,
} from "../../../redux/manufactor/manufactor.selectors";
import { withRouter } from "react-router-dom";
import LeftSideMenu from "../../Layout/left-side-menu/left-side-menu.component";
const ManufactorLeftSide = ({
  mobileView,
  tabletView,
  productGroupList,
  maxPrice,
  match,
  history,
}) => {
  const [minPriceChange, setMinPriceChange] = useState(0);
  const [maxPriceChange, setMaxPriceChange] = useState(maxPrice);
  const [filter, setFilter] = useState(false);
  useEffect(() => {
    let manufactorPath = match.url.split("/")[2];        
    let page = +match.params.page || 1;
    if (filter) {
      history.push(
        `/manufactor/${manufactorPath}/products?page=${page}&min_price=${minPriceChange}&max_price=${maxPriceChange}`
      );
      setFilter(false);
    }
  }, [filter, minPriceChange, maxPriceChange]);
  return (
    <ManufactorLeftSideWrapper>
      {productGroupList.length ? (
        <LeftSideMenu title="DS Nhóm SP" list={productGroupList} />
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
    </ManufactorLeftSideWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  productGroupList: selectProductGroupList,
  maxPrice: selectMaxPrice,
});

export default connect(mapStateToProps)(withRouter(ManufactorLeftSide));
