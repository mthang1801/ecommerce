import React, { useEffect, useState, memo } from "react";
import ProductSlider from "../../UI/product-slider/product-slider.component";
import {getBestSellerProducts} from "../../../utils/connectDB"
import {ProductsBestSellerWrapper} from "./product-best-seller.styles";
const ProductsBestSeller = ({ mobileView, tabletView }) => { 
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  useEffect(() => {
    let _mounted = true;
    getBestSellerProducts().then(data => {
      if(_mounted){
        console.log(data);
        setBestSellerProducts(data);
      }
    });
    return () => _mounted = false;
  }, [getBestSellerProducts]);
   
  return (
    <ProductsBestSellerWrapper>
      <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={bestSellerProducts} title="Sản phẩm bán chạy"/>
    </ProductsBestSellerWrapper> 
  );
};

export default memo(ProductsBestSeller);
