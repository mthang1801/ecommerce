import React from 'react'
import {ContactOverviewCotnainer} from "./contact-overview.styles";
import ContactServices from "../contact-services/contact-services.component";
import ShopMapAddress from "../shop-map-address/shop-map-address.component";
import ContactMessageForm from "../contact-message-form/contact-message-form.component";
const ContactOverview = () => {
  return (
    <ContactOverviewCotnainer>
      <ContactServices/> 
      <ShopMapAddress/>
      <ContactMessageForm/>
    </ContactOverviewCotnainer>
  )
}

export default ContactOverview
