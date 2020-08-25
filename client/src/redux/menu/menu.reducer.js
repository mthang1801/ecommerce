import menuActionTypes from "./menu.types";

const INITIAL_STATE = {
  menuList: null,
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case menuActionTypes.FETCH_MENU_START:
      return {
        ...state,
        error: undefined,
        loading: true,
      };
    case menuActionTypes.FETCH_MENU_SUCCESS:
      return {
        ...state,
        menuList: action.payload,
        loading: false,
      };
    case menuActionTypes.FETCH_MENU_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
