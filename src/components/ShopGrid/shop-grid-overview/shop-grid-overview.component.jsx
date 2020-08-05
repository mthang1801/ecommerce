import React from "react";
import {ShopGridOverviewContainer, Grid} from "./shop-grid-overview.styles";
import ShopGridLeftSide from "../shop-grid-left-side/shop-grid-left-side.component";
import ShopGridRightSide from "../shop-grid-right-side/shop-grid-right-side.component";
const ShopGridOverview = () => {
  return (
    <ShopGridOverviewContainer>     
      <Grid w25>
        <ShopGridLeftSide />
      </Grid>
      <Grid>
        <ShopGridRightSide />
      </Grid>
    </ShopGridOverviewContainer>
  );
};

export default ShopGridOverview;
