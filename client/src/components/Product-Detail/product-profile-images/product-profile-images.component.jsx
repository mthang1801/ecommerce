import React, { useState } from "react";
import Magnifier from "react-magnifier";
import {
  ProductImagesContainer,
  BackgroundImageContainer,
  Image,
} from "./product-profile-images.styles";
import Slider from "react-slick";

const ProductImages = ({images}) => {
  const [currentImg, setCurrentImg] = useState(images[0]);  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: images.length < 4 ? images.length : 4,
    slidesToScroll: 1,    
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };    
  return (
    <ProductImagesContainer>
      <BackgroundImageContainer>
        <Magnifier
          src={`data:${currentImg.mimetype};base64,${currentImg.data}`}
          width={400}
          height={400}
          zoomFactor={1.3}
          mgWidth={150}
          mgHeight={150}
          mgBorderWidth={2}
          mgShowOverflow
        />
      </BackgroundImageContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Image key={image._id} src={`data:${image.mimetype};base64,${image.data}`} onClick={() => setCurrentImg(image)} />
        ))}
      </Slider>
    </ProductImagesContainer>
  );
};


export default ProductImages;
