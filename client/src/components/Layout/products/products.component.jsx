import React from 'react'
import {ProductsContainer} from "./products.styles";
import ProductItem from "../../UI/product-item/product-item.component";

const Products = ({mobileView,tabletView, productList}) => {  
  return (    
    <ProductsContainer mobileView={mobileView} tabletView={tabletView} >
      {productList.map(product => (        
          <ProductItem key={product._id}  product={product}/>               
      ))}
    </ProductsContainer>
  )
}

export default Products
