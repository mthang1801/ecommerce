import { combineReducers } from "redux";
import drawerReducer from "./drawer/drawer.reducer";
import userReducer from "./user/user.reducer";
import sellerReducer from "./seller/seller.reducer";
import categoryReducer from "./category/category.reducer";
import productTypeReducer from "./product-type/product-type.reducer";
import productReducer from "./product/product.reducer";
import manufactorReducer from "./manufactor/manufactor.reducer";
import productGroupReducer from "./product-group/product-group.reducer";
import productDetailReducer from "./product-detail/product-detail.reducer";
import orderedReducer from "./ordered/ordered.reducer";
import cartReducer from "./cart/cart.reducer";
import productReviewsReducer from "./product-reviews/product-reviews.reducer";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"],
};
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  blacklist: ["orderedDetail"],
};
const rootReducer = combineReducers({
  drawer: drawerReducer,
  user: userReducer,
  seller: sellerReducer,
  category: categoryReducer,
  productType: productTypeReducer,
  product: productReducer,
  manufactor: manufactorReducer,
  productGroup: productGroupReducer,
  productDetail: productDetailReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  ordered: orderedReducer,
  productReviews: productReviewsReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
