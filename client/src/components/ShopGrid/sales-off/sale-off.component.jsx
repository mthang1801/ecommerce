import React from "react";
import { SaleOffContainer, SeleOffLabel } from "./sale-off.styles";
import { getSaleOffProducts } from "../../../utils/connectDB";
import Slider from "react-slick";
import ProductItem from "../../UI/product-item/product-item.component";
const saleOffProducts = getSaleOffProducts();
const SaleOff = ({ mobileView, tabletView }) => {
  const settings = {
    infinite: true,
    slidesToShow: mobileView || tabletView ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,   
    centerPadding: mobileView ? "10px" : tabletView ? "25px" : "auto",
    autoplaySpeed: 2000,    
    pauseOnHover: true,
    centerMode:mobileView || tabletView ?  true : false,        
  };
  return (
    <SaleOffContainer>
      <SeleOffLabel>Mặt hàng đang giảm giá</SeleOffLabel>
      <Slider {...settings}>
        {saleOffProducts && saleOffProducts.length > 10
          ? saleOffProducts
              .filter((_, idx) => idx < 20)
              .map((product) => (
                <ProductItem key={product._id} product={product} />
              ))
          : null}
      </Slider>
    </SaleOffContainer>
  );
};

export default SaleOff;
