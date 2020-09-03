import React, {useState, useContext, useEffect} from "react";
import {ProductGroupOverviewWrapper, Grid} from "./product-group-overview.styles";
import ProductGroupLeftSide from "../product-group-left-side/product-group-left-side.component";
import ProductGroupRightSide from "../product-group-right-side/product-group-right-side.component";
import AppContext from "../../../context/app-viewport.context";
const ProductGroupOverview = () => {
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
    <ProductGroupOverviewWrapper mobileView={mobileView}>     
      <Grid w25 mobileView={mobileView} tabletView={tabletView}>
        <ProductGroupLeftSide mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <ProductGroupRightSide  mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
    </ProductGroupOverviewWrapper>
  );
};

export default ProductGroupOverview;
