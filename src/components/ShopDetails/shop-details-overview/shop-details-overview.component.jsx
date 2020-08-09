import React, {useState, useContext, useEffect}  from 'react'
import {ShopDetailsOverViewContainer} from "./shop-details-overview.styles";
import MainInterface from "../main-interface/main-interface.component";
import Taskbar from "../taskbar/taskbar.component";
import ListRelatedProducts from "../list-related-products/list-related-products.component";
import AppContext from "../../../context/app-viewport.context";
const ShopDetailsOverView = () => {
  const [mobileView, setMobileView] = useState(window.innerWidth < 768);
  const [tabletView, setTabletView] = useState(window.innerWidth < 992 && window.innerWidth >= 768);
  const width = useContext(AppContext);
  useEffect(() => {
    if (width < 768) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
    if (width < 992 && width >= 768) {
      setTabletView(true);
    } else {
      setTabletView(false);
    }
  }, [width]);
  return (
    <ShopDetailsOverViewContainer>
      <MainInterface mobileView={mobileView} tabletView={tabletView}/>
      <Taskbar mobileView={mobileView} tabletView={tabletView}/>
      <ListRelatedProducts mobileView={mobileView} tabletView={tabletView}/>
    </ShopDetailsOverViewContainer>
  )
}

export default ShopDetailsOverView
