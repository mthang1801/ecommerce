import React from 'react'
import {Wrapper} from "./styles/PortfolioCategoriesBoard.styles"
import PortfolioCategoryItem from "./PortfolioCategoryItem"
const PortfolioCategories = ({data}) => {
  const {categories, name, slug} = data;
  
  return (
    <Wrapper>
      {categories.map(category => (
        <PortfolioCategoryItem key={`category-${category._id}`} portfolioSlug={slug} category={category}/>
      ))}
    </Wrapper>
  )
}

export default PortfolioCategories
