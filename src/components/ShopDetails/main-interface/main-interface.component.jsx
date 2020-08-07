import React from 'react'
import {MainInterfaceContainer, Grid} from "./main-interface.styles";
import ProductProfileImages from "../product-profile-images/product-profile-images.component";
import ProductProfileText from "../product-profile-text/product-profile-text.component";
const MainInterface = () => {
  return (
    <MainInterfaceContainer>
      <Grid w40>
        <ProductProfileImages/>
      </Grid>
      <Grid>
        <ProductProfileText/>
      </Grid>
    </MainInterfaceContainer>
  )
}

export default MainInterface
