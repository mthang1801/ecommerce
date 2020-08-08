import { combineReducers } from "redux";
import drawerReducer from "./drawer/drawer.reducer";
import isMobileReducer from "./checkViewPort/checkViewPort.reducer";
export default combineReducers({
  drawer: drawerReducer,
  isMobile: isMobileReducer,
});
