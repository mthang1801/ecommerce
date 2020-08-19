import React,  { useState, useEffect, useContext } from 'react'
import {SellerOverviewContainer} from "./seller-overview.styles";
import Steppers from "../steppers/steppers.component";
import AppContext from "../../../context/app-viewport.context";
import FormCreateProduct from "../form-create-product/form-create-product.component";
const SellerOverview = () => {
  
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
    <SellerOverviewContainer>
      <FormCreateProduct/>
      {/* <Steppers mobileView={mobileView} tabletView={tabletView} /> */}
    </SellerOverviewContainer>
  )
}

export default SellerOverview
