import React from 'react'
import {Wrapper} from "./styles/PortfolioItem.styles"
import {LazyLoadImage} from "react-lazy-load-image-component"

const PortfolioItem = ({portfolio}) => {    
  return (
    <Wrapper to={`/${portfolio.slug}`}>
      <LazyLoadImage 
        alt={portfolio.image.url}
        height={60}
        width={60}
        src={portfolio.image.url}
        effect="blur"        
      />
      <div>{portfolio.name}</div>
    </Wrapper>
  )
}

export default PortfolioItem
