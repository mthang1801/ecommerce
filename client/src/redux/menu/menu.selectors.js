import { createSelector } from "reselect";

const selectMenu = (state) => state.menu;
export const selectMenuList = createSelector(
  selectMenu,
  (menu) => menu.menuList
);

export const selectMenuLoading = createSelector(
  selectMenu,
  (menu) => menu.loading
);
