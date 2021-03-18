import React from 'react'
import {Wrapper} from "./styles/CategoryProductTypesBoard.styles"
import CategoryProductTypeItem from "./CategoryProductTypeItem"
const CategoryProductItemsBoard = ({data}) => {
  const {productTypes} = data;     
  return (
    <Wrapper>
      {productTypes.map(productType => (
        <CategoryProductTypeItem key={`productType-${productType._id}`} productType={productType}/>
      ))}
    </Wrapper>
  )
}

export default CategoryProductItemsBoard
