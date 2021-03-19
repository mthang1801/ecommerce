import styled from "styled-components";

export const CarouselBannerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const Image = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ img }) => (img ? `url(${img})` : "")};
  background-color: transparent;
  background-size: cover;
  height : ${({ height }) => (height ? `${height}px` : "100%")};
  align-items: flex-start;
  justify-content: center;
  // padding : ${({ mobileView }) => (mobileView ? "2rem" : "0")} ;
  position: relative;
  z-index: 0;
`;
