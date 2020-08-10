import { createSelector } from "reselect";

const selectDrawer = (state) => state.drawer;

export const selectOpenDrawer = createSelector(
  selectDrawer,
  (drawer) => drawer.showDrawer
);
