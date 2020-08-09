import React, {useState, useEffect, useContext} from 'react'
import {ContactOverviewCotnainer} from "./contact-overview.styles";
import ContactServices from "../contact-services/contact-services.component";
import ShopMapAddress from "../shop-map-address/shop-map-address.component";
import ContactMessageForm from "../contact-message-form/contact-message-form.component";
import AppContext from "../../../context/app-viewport.context";
const ContactOverview = () => {
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
    <ContactOverviewCotnainer mobileView={mobileView} tabletView={tabletView}>
      <ContactServices mobileView={mobileView} tabletView={tabletView}/> 
      <ShopMapAddress/>
      <ContactMessageForm  mobileView={mobileView} tabletView={tabletView}/>
    </ContactOverviewCotnainer>
  )
}

export default ContactOverview
