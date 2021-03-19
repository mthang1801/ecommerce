import React, {useState, useEffect} from 'react'
import {Wrapper, CarouselSide, SingleImageSide} from "./styles/Banner.styles"
import CarouselBanner from "./CarouselBanner"
import useLanguage from "../Global/useLanguage"
import LazyLoad from "react-lazyload"
import {Link} from "react-router-dom"
const Banner = () => {
  const {i18n,lang} = useLanguage()
  const {singleImage} = i18n.store.data[lang].translation; 
  
  return (
    <Wrapper>
      <CarouselSide>
        <CarouselBanner/>
      </CarouselSide>
      <SingleImageSide>
        <LazyLoad>
          {singleImage && <Link to={singleImage.linkUrl}><img src={singleImage.image} alt={singleImage.image}/></Link>}
        </LazyLoad>
      </SingleImageSide>
    </Wrapper>
  )
}

export default Banner
