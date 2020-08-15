import { combineReducers } from "redux";
import categoryReducer from "./category/category.reducer";
import productTypesReducer from "./product-types/product-types.reducer";
import productsReducer from "./products/products.reducer";
import userReducer from "./user/user.reducer";
export default combineReducers({
  category: categoryReducer,
  productTypes: productTypesReducer,
  products: productsReducer,
  user: userReducer,
});
