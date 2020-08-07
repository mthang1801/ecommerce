import React, { useState } from "react";
import Magnifier from "react-magnifier";
import {
  ProductImagesContainer,
  BackgroundImageContainer,
  Image,
} from "./product-profile-images.styles";
import Slider from "react-slick";

const images = [
  "https://images.unsplash.com/photo-1596678148183-537057e06fe4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  "https://images.unsplash.com/photo-1583161443185-0a55235f00d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  "https://images.unsplash.com/photo-1583161443085-2e2947a6664c?ixlib=rb-1.2.1&auto=format&fit=crop&w=282&q=80",
  "https://images.unsplash.com/photo-1474436799594-1974f1add7ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=724&q=80",
  "https://images.unsplash.com/photo-1590463534652-d5b366e62770?ixlib=rb-1.2.1&auto=format&fit=crop&w=345&q=80",
  "https://images.unsplash.com/photo-1596226833523-6c01b9ee484c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80",
];

const ProductImages = () => {
  const [currentImg, setCurrentImg] = useState(images[0]);
  React.useEffect(() => {
    console.log(currentImg);
  }, [currentImg]);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
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
          src={currentImg}
          width={400}
          height={500}
          zoomFactor={1.2}
          mgWidth={150}
          mgHeight={150}
          mgBorderWidth={2}
          mgShowOverflow
        />
      </BackgroundImageContainer>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Image key={image} src={image} onClick={() => setCurrentImg(image)} />
        ))}
      </Slider>
    </ProductImagesContainer>
  );
};

export default ProductImages;
