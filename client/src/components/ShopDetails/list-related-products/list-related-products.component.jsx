import React from "react";
import { ListRelatedProductContainer,Title, ListProducts } from "./list-related-products.styles";
import { getProductsPerpage} from "../../../utils/algorithms";
import ProductItem from "../../UI/product-item/product-item.component";

let relatedProducts = getProductsPerpage();
const ListRelatedProduct = ({mobileView, tabletView}) => {
  return (
    <ListRelatedProductContainer >
      <Title>Sản phẩm tương tự</Title>
      <ListProducts mobileView={mobileView} tabletView={tabletView}>
        { relatedProducts
          .filter((_, idx) => idx < 4 )
          .map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
      </ListProducts>
    </ListRelatedProductContainer>
  );
};

export default ListRelatedProduct;
