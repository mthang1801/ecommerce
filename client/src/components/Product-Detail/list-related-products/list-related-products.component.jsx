import React from "react";
import { ListRelatedProductContainer,Title, ListProducts } from "./list-related-products.styles";
import { getProductsPerpage} from "../../../utils/connectDB";
import  ProductSlider from "../../UI/product-slider/product-slider.component"
const ListRelatedProduct = ({mobileView, tabletView, productList}) => {  
  return (
    <ListRelatedProductContainer >
      <Title>Sản phẩm tương tự</Title>
      <ListProducts mobileView={mobileView} tabletView={tabletView}>
        <ProductSlider mobileView={mobileView} tabletView={tabletView} productList={productList}/>
      </ListProducts>
    </ListRelatedProductContainer>
  );
};

export default ListRelatedProduct;
