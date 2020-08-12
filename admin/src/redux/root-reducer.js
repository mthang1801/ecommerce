import { combineReducers } from "redux";
import categoryReducer from "./category/category.reducer";
import productTypesReducer from "./product-types/product-types.reducer";
export default combineReducers({
  category: categoryReducer,
  productTypes: productTypesReducer,
});
