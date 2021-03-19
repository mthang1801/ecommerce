import React, {useEffect, useRef, useState} from 'react'
import {CarouselBannerWrapper, Image} from "./styles/CarouselBanner.styles";
import useLanguage from "../Global/useLanguage"
import {Link} from "react-router-dom"
import Slider from "react-slick";
import LazyLoad from "react-lazyload"
const CustomArrowPrev = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", opacity : "0.9" , position : "absolute", left: "3%", zIndex: 1}}
      onClick={onClick}
    />
  )
}
const CustomArrowNext = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "transparent", opacity : "0.9" , position : "absolute", right: "3%", zIndex: 1 }}
      onClick={onClick}
    />
  )
}

const CarouselBanner = () => {
  const [carouselHeight, setCarouselHeight] = useState(0)
  const carouselRef = useRef(null);
  const {i18n, lang} = useLanguage()
  const {bannerImages} = i18n.store.data[lang].translation
  const settings = {
    dots: true,
    infinite: true,
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
  console.log(bannerImages)
  if(!bannerImages || !bannerImages.length)  return null; 
  return (
    <CarouselBannerWrapper  ref={carouselRef}>
      <Slider {...settings} >
        {/* {bannersData.map(bannerItem => (
          <Banner key={bannerItem.imageUrl} img={bannerItem.imageUrl} height={carouselHeight} linkUrl={bannerItem.linkUrl} />
        ))} */}
        {bannerImages.map(image => (
          <Link to={image.linkUrl} key={image.id}>
            <LazyLoad>
              <Image img={image.image} height={carouselHeight} alt={image.image}/>
            </LazyLoad>
          </Link>
        ))}
      </Slider>
    </CarouselBannerWrapper>
  )
}

export default CarouselBanner
