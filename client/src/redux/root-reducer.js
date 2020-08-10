import { combineReducers } from "redux";
import drawerReducer from "./drawer/drawer.reducer";
export default combineReducers({
  drawer: drawerReducer,
});
