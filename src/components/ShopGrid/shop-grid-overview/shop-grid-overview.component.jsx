import React, {useState, useContext, useEffect} from "react";
import {ShopGridOverviewContainer, Grid} from "./shop-grid-overview.styles";
import ShopGridLeftSide from "../shop-grid-left-side/shop-grid-left-side.component";
import ShopGridRightSide from "../shop-grid-right-side/shop-grid-right-side.component";
import AppContext from "../../../context/app-viewport.context";
const ShopGridOverview = () => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 660);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 660) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 660) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);
  
  return (
    <ShopGridOverviewContainer mobileView={mobileView}>     
      <Grid w25 mobileView={mobileView} tabletView={tabletView}>
        <ShopGridLeftSide mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <ShopGridRightSide  mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
    </ShopGridOverviewContainer>
  );
};

export default ShopGridOverview;
