import menuActionTypes from "./menu.types";

export const fetchMenuStart = () => ({
  type: menuActionTypes.FETCH_MENU_START,
});
export const fetchMenuSuccess = (menuList) => ({
  type: menuActionTypes.FETCH_MENU_SUCCESS,
  payload: menuList,
});
export const fetchMenuFail = (err) => ({
  type: menuActionTypes.FETCH_MENU_FAIL,
  error: err,
});
