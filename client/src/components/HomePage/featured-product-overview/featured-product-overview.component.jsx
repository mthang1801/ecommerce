import React, {useState, useContext, useEffect, memo} from 'react'
import {FeaturedProductOverViewContainer, Grid} from "./featured-product-overview.styles";
import LatestProduct from "../products-latest/products-latest.component";
import ProductsBestSeller from "../products-best-seller/product-best-seller.component";
import ProductsTopRated from "../products-top-rated/products-top-rated.component";
import AppContext from "../../../context/app-viewport.context";
const FeaturedProductOverView = () => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 600);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 600);
  const width = useContext(AppContext);  
  useEffect(() => {
    if (width < 600) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 600) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]); 
  return (
    <FeaturedProductOverViewContainer>
      <Grid tabletView={tabletView} mobileView={mobileView}>
        <LatestProduct tabletView={tabletView} mobileView={mobileView}/>
      </Grid>
      <Grid tabletView={tabletView} mobileView={mobileView}>
        <ProductsBestSeller tabletView={tabletView} mobileView={mobileView}/>
      </Grid>
      <Grid tabletView={tabletView} mobileView={mobileView}>
        <ProductsTopRated tabletView={tabletView} mobileView={mobileView}/>
      </Grid>
    </FeaturedProductOverViewContainer>
  )
}

export default FeaturedProductOverView
