import checkViewPortTypes from "./checkViewPort.types";

const INITIAL_STATE = {
  isMobile: window.innerWidth < 992,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case checkViewPortTypes.SET_IS_DESKTOP:
      return { isMobile: false };
    case checkViewPortTypes.SET_IS_MOBILE:
      return { isMobile: true };
    default:
      return state;
  }
};
