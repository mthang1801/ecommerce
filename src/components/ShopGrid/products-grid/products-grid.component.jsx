import React from 'react'
import {ProductsGridContainer} from "./products-grid.styles";
import {getProductsPerpage} from "../../../utils/algorithms";
import ProductItem from "../../UI/product-item/product-item.component";
let productsPageOne = getProductsPerpage(1);
const ProductsGrid = () => {
  return (
    <ProductsGridContainer>
      {productsPageOne.map(product => (
        <ProductItem key={product._id}  product={product}/>
      ))}
    </ProductsGridContainer>
  )
}

export default ProductsGrid
