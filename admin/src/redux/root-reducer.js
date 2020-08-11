import { combineReducers } from "redux";
import categoryReducer from "./category/category.reducer";
export default combineReducers({
  category: categoryReducer,
});
