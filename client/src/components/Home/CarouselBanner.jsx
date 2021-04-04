import React, {useEffect, useRef, useState} from 'react'
import {CarouselBannerWrapper, Image} from "./styles/CarouselBanner.styles";
import useLanguage from "../Global/useLanguage"
import {Link} from "react-router-dom"
import Slider from "react-slick";
import {CustomArrowNext, CustomArrowPrev} from "../Custom/CustomArrowSlider"

const CarouselBanner = () => {
  const [carouselHeight, setCarouselHeight] = useState(0)
  const carouselRef = useRef(null);
  const {i18n, lang} = useLanguage()
  const {bannerImages} = i18n.store.data[lang].translation
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomArrowNext />,
    prevArrow: <CustomArrowPrev />,
    autoplaySpeed: 4000,
    autoplay : true , 
    appendDots : dots => (<div
      style={{
        position : "absolute",
        bottom : "3%",
        color : "white"       
      }}
    >
      <ul style={{ margin: "0px" }}> {dots} </ul>
    </div>)
  };

  useEffect(() => {
    setCarouselHeight(carouselRef.current.clientHeight);
  },[carouselRef.current] )
  if(!bannerImages || !bannerImages.length)  return null; 
  return (
    <CarouselBannerWrapper  ref={carouselRef}>
      <Slider {...settings} >        
        {bannerImages.map(image => (
          <Link to={image.linkUrl} key={image.id}>
            
              <Image img={image.image} height={carouselHeight} alt={image.image}/>            
          </Link>
        ))}
      </Slider>
    </CarouselBannerWrapper>
  )
}

export default CarouselBanner
