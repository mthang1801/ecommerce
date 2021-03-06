import React from 'react'
import {MainInterfaceContainer, Grid} from "./main-interface.styles";
import ProductProfileImages from "../product-profile-images/product-profile-images.component";
import ProductProfileText from "../product-profile-text/product-profile-text.component";
const MainInterface = ({mobileView, tabletView, product}) => { 
  return (
    <MainInterfaceContainer mobileView={mobileView} tabletView={tabletView}>
      <Grid w40 mobileView={mobileView} tabletView={tabletView}>
        <ProductProfileImages images={product.images}/>
      </Grid>
      <Grid mobileView={mobileView} tabletView={tabletView}>
        <ProductProfileText mobileView={mobileView} tabletView={tabletView} product={product}/>
      </Grid>
    </MainInterfaceContainer>
  )
}


export default MainInterface;
