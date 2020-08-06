import React from 'react'
import {SaleOffContainer, SeleOffLabel} from "./sale-off.styles";
import {getSaleOffProducts} from "../../../utils/algorithms"
import Slider from "react-slick";
import ProductItem from "../product-item/product-item.component";
const saleOffProducts = getSaleOffProducts();
const SaleOff = () => { 
  const settings = {    
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover : true
  };
  return (
    <SaleOffContainer>
      <SeleOffLabel>Mặt hàng đang giảm giá</SeleOffLabel>
      <Slider {...settings}>
        {saleOffProducts && saleOffProducts.length > 10 ? 
          saleOffProducts.filter((_,idx) => idx < 20).map(product => (
            <ProductItem key={product._id} product={product}/>
          ))
          :
          null
      }
      </Slider>
    </SaleOffContainer>
  )
}

export default SaleOff
