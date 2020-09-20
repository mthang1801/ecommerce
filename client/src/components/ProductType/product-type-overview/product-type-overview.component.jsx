import React, {useState, useContext, useEffect, createRef} from "react";
import {ProductTypeOverviewWrapper, Grid} from "./product-type-overview.styles";
import ProductTypeLeftSide from "../product-type-left-side/product-type-left-side.component";
import ProductTypeRightSide from "../product-type-right-side/product-type-right-side.component";
import AppContext from "../../../context/app-viewport.context";
const ProductTypeOverview = () => {
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
    <ProductTypeOverviewWrapper mobileView={mobileView}>     
      <Grid w25 mobileView={mobileView} tabletView={tabletView}>
        <ProductTypeLeftSide mobileView={mobileView} tabletView={tabletView}/>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <ProductTypeRightSide  mobileView={mobileView} tabletView={tabletView} />
      </Grid>
    </ProductTypeOverviewWrapper>
  );
};

export default ProductTypeOverview;
