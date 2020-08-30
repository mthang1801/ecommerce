import React, { useState, useEffect,  memo } from "react";
import {LatestProductsWrapper} from "./products-latest.styles";
import { getLatestProducts } from "../../../utils/connectDB";
import ProductSlider from "../../UI/product-slider/product-slider.component";
const LatestProducts = ({ mobileView, tabletView }) => {

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    let _mounted = true ;
    getLatestProducts().then((data) => {
      if(_mounted){
        setLatestProducts(data);
      }
           
    });
    return () => _mounted = false 
  }, []);
  
  return (
   <LatestProductsWrapper>
     <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={latestProducts} title="Sản phẩm mới"/>
   </LatestProductsWrapper>
  );
};

export default memo(LatestProducts);
