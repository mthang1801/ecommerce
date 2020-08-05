import React from 'react'
import {FeaturedProductOverViewContainer, Grid} from "./featured-product-overview.styles";
import LatestProduct from "../products-latest/products-latest.component";
import ProductsBestSeller from "../products-best-seller/product-best-seller.component";
import ProductsTopRated from "../products-top-rated/products-top-rated.component"
const FeaturedProductOverView = () => {
  return (
    <FeaturedProductOverViewContainer>
      <Grid>
        <LatestProduct/>
      </Grid>
      <Grid>
        <ProductsBestSeller/>
      </Grid>
      <Grid>
        <ProductsTopRated/>
      </Grid>
    </FeaturedProductOverViewContainer>
  )
}

export default FeaturedProductOverView
