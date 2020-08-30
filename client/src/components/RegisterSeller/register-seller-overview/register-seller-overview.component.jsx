import React,  { useState, useEffect, useContext } from 'react'
import {SellerOverviewContainer} from "./register-seller-overview.styles";
import Steppers from "../steppers/steppers.component";
import AppContext from "../../../context/app-viewport.context";
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
      <Steppers mobileView={mobileView} tabletView={tabletView} />
    </SellerOverviewContainer>
  )
}

export default SellerOverview
