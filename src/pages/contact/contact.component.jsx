import React from 'react'
import {ContactPageContainer} from "./contact.styles";
import Background  from "../../components/Layout/background/background.component";
import ContactOverview from "../../components/Contact/contact-overview/contact-overview.component";
import ShopMapAddress from "../../components/Contact/shop-map-address/shop-map-address.component";
const ContactPage = () => {
  return (
    <ContactPageContainer>
      <Background label="Contact"/>
      <ContactOverview/>      
    </ContactPageContainer>
  )
}

export default ContactPage
