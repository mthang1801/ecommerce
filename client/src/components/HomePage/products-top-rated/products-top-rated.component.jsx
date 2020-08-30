import React, { useEffect, useState } from "react";
import { ProductsTopRatedWrapper } from "./products-top-rated.styles";
import { getTopRatedProducts } from "../../../utils/connectDB";
import ProductSlider from "../../UI/product-slider/product-slider.component";


const ProductsTopRated = ({ mobileView, tabletView }) => {
  const [topRatedProducts, setTopRatedProduct] = useState([]);
  useEffect(() => {
    let _mounted = true;
    getTopRatedProducts().then((data) => {
      console.log(data);
      if (_mounted) {
        setTopRatedProduct(data);
      }
    });
    return () => (_mounted = false);
  }, [getTopRatedProducts]);
 
  return <ProductsTopRatedWrapper>
    <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={topRatedProducts} title="Sản phẩm HOT"/>
  </ProductsTopRatedWrapper>;
};

export default ProductsTopRated;
