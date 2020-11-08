import React, {useState, useEffect} from "react";
import { ProductGroupLeftSideWrapper } from "./product-group-left-side.styles";
import PriceScope from "../../Layout/price-scope/price-scope.component";
import StarScope from "../../Layout/star-scope/star-scope.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectMaxPrice } from "../../../redux/product-group/product-group.selectors";
import { withRouter } from "react-router-dom";
const ProductGroupLeftSide = ({ mobileView, tabletView, maxPrice, match, history }) => {
  const [minPriceChange, setMinPriceChange] = useState(0);
  const [maxPriceChange, setMaxPriceChange] = useState(maxPrice);
  const [filter, setFilter] = useState(false);
  useEffect(() => {         
    let page = +match.params.page || 1;
    if (filter) {
      history.push(
        `${match.url}?page=${page}&min_price=${minPriceChange}&max_price=${maxPriceChange}`
      );
    }
  }, [filter, minPriceChange, maxPriceChange, history, match]);
  return (
    <ProductGroupLeftSideWrapper>
      <PriceScope
        mobileView={mobileView}
        tabletView={tabletView}
        maxPrice={maxPrice}
        setMinPriceChange={(value) => setMinPriceChange(value)}
        setMaxPriceChange={(value) => setMaxPriceChange(value)}
        setFilter={() => setFilter(true)}
      />
      <StarScope mobileView={mobileView} tabletView={tabletView} />
    </ProductGroupLeftSideWrapper>
  );
};

const mapStateToProps = createStructuredSelector({
  maxPrice: selectMaxPrice,
});

export default connect(mapStateToProps)(withRouter(ProductGroupLeftSide));
