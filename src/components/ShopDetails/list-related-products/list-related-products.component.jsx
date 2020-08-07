import React from "react";
import { ListRelatedProductContainer,Title, ListProducts } from "./list-related-products.styles";
import { getProductsPerpage} from "../../../utils/algorithms";
import ProductItem from "../../UI/product-item/product-item.component";

let relatedProducts = getProductsPerpage();
const ListRelatedProduct = () => {
  return (
    <ListRelatedProductContainer>
      <Title>Sản phẩm liên quan</Title>
      <ListProducts>
        {relatedProducts
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
      </ListProducts>
    </ListRelatedProductContainer>
  );
};

export default ListRelatedProduct;
