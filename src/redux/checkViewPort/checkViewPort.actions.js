import checkViewPortTypes from "./checkViewPort.types";

export const setViewPortMobile = () => ({
  type: checkViewPortTypes.SET_IS_MOBILE,
});

export const setViewPortDesktop = () => ({
  type: checkViewPortTypes.SET_IS_DESKTOP,
});
