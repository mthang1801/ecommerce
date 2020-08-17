import { combineReducers } from "redux";
import drawerReducer from "./drawer/drawer.reducer";
import userReducer from "./user/user.reducer";
export default combineReducers({
  drawer: drawerReducer,
  user: userReducer,
});
