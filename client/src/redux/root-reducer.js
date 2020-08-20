import { combineReducers } from "redux";
import drawerReducer from "./drawer/drawer.reducer";
import userReducer from "./user/user.reducer";
import sellerReducer from "./seller/seller.reducer";
export default combineReducers({
  drawer: drawerReducer,
  user: userReducer,
  seller: sellerReducer,
});
