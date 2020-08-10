import drawerActionTypes from "./drawer.styles";

const INITIAL_STATE = {
  showDrawer: false,
};

const drawerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case drawerActionTypes.SET_OPEN_DRAWER:
      return {
        ...state,
        showDrawer: true,
      };
    case drawerActionTypes.SET_CLOSE_DRAWER:
      return {
        ...state,
        showDrawer: false,
      };
    default:
      return state;
  }
};

export default drawerReducer;
