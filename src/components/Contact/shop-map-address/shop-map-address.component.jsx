import React from "react";
import { ShopMapAddressContainer } from "./shop-map-address.styles";
const ShopMapAddress = () => {
  return (
    <ShopMapAddressContainer>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49116.39176087041!2d-86.41867791216099!3d39.69977417971648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886ca48c841038a1%3A0x70cfba96bf847f0!2sPlainfield%2C%20IN%2C%20USA!5e0!3m2!1sen!2sbd!4v1586106673811!5m2!1sen!2sbd"
        height={500}        
        style={{border:0, width : "100%"}}
        allowfullscreen={true}
        aria-hidden="false"
        tabindex="0"
      />
    </ShopMapAddressContainer>
  );
};

export default ShopMapAddress;
