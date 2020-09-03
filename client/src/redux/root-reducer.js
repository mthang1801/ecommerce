import { combineReducers } from "redux";
import drawerReducer from "./drawer/drawer.reducer";
import userReducer from "./user/user.reducer";
import sellerReducer from "./seller/seller.reducer";
import categoryReducer from "./category/category.reducer";
import productTypeReducer from "./product-type/product-type.reducer";
import productReducer from "./product/product.reducer";
import manufactorReducer from "./manufactor/manufactor.reducer";
import productGroupReducer from "./product-group/product-group.reducer";
const rootReducer = combineReducers({
  drawer: drawerReducer,
  user: userReducer,
  seller: sellerReducer,
  category: categoryReducer,
  productType: productTypeReducer,
  product: productReducer,
  manufactor: manufactorReducer,
  productGroup: productGroupReducer,
});

export default rootReducer;
