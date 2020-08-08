import drawerActionTypes from "./drawer.styles";

export const setOpenDrawer = () => ({
  type: drawerActionTypes.SET_OPEN_DRAWER,
});

export const setCloseDrawer = () => ({
  type: drawerActionTypes.SET_CLOSE_DRAWER,
});
