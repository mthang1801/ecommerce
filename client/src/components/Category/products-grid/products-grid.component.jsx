import React from 'react'
import {ProductsGridContainer} from "./products-grid.styles";
import {getProductsPerpage} from "../../../utils/connectDB";
import ProductItem from "../../UI/product-item/product-item.component";

const ProductsGrid = ({mobileView,tabletView}) => {
  let productsPageOne ; 
  if(mobileView){
    productsPageOne = getProductsPerpage(1, "mobileView");
  }else 
  if(tabletView){
    productsPageOne = getProductsPerpage(1, "tabletView");
  }else{
    productsPageOne = getProductsPerpage(1);
  }
  return (
    <div></div>
    // <ProductsGridContainer mobileView={mobileView} tabletView={tabletView} >
    //   {productsPageOne.map(product => (
    //     <ProductItem key={product._id}  product={product}/>
    //   ))}
    // </ProductsGridContainer>
  )
}

export default ProductsGrid
