import React from 'react'
import {BannerOverViewContainer, Grid} from "./banner-overview.styles";
import Banner from "../banner/banner.component"

const BannerOverView = () => {
  return (
    <BannerOverViewContainer>     
      <Grid w25/>
      <Grid>
       <Banner />   
      </Grid>         
    </BannerOverViewContainer>
  )
}

export default BannerOverView
