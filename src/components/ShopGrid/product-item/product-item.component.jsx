import React from "react";
import {
  ProductItemContainer,
  ProductItemImageContainer,
  ProductItemImage,
  ProductDiscount,
  ProductItemText,
  ProductName,
  ProductPrice,
  ProductNewPrice,
  ProductOldPrice,
  ButtonsGroup,
  Button,
} from "./product-item.styles";
import {FaHeart, FaShoppingCart, FaEye} from "react-icons/fa"
const ProductItem = ({ product }) => {
  return (
    <ProductItemContainer title={product.name}>
      <ProductItemImageContainer>
        <ProductItemImage src={product.imageUrl} />
        {product.discount > 0 && <ProductDiscount>-{product.discount}%</ProductDiscount>}
        <ButtonsGroup>
          <Button><FaHeart/></Button>
          <Button><FaEye/></Button>
          <Button><FaShoppingCart/></Button>
        </ButtonsGroup>
      </ProductItemImageContainer>
      <ProductItemText>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>
          <ProductOldPrice>{product.price.toLocaleString("es-AR")}Đ</ProductOldPrice>
          <ProductNewPrice>{(product.price * (100-product.discount)/100).toLocaleString("es-AR")}Đ</ProductNewPrice>        
        </ProductPrice>
      </ProductItemText>
    </ProductItemContainer>
  );
};

export default ProductItem;
