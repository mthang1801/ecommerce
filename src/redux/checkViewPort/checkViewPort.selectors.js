import { createSelector } from "reselect";

export const selectViewPort = (state) => state.isMobile;

export const selectIsMobile = createSelector(
  selectViewPort,
  (viewport) => viewport.isMobile
);
