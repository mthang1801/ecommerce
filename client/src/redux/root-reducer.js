import { combineReducers } from "redux";
import drawerReducer from "./drawer/drawer.reducer";
import userReducer from "./user/user.reducer";
import homeReducer from "./home/home.reducer";
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
import commentReviewsReducer from "./product-comment-review/product-comment-review.reducer";
import productsFavoriteReducer from "./products-favorite/products-favorite.reducer";
import searchReducer from "./search/search.reducer";
import adminPortfolioReducer from "./admin-portfolio/admin-portfolio.reducer"
import adminCategoryReducer from "./admin-category/admin-category.reducer"
import adminProductGroupReducer from "./admin-product-group/admin-product-group.reducer"
import { persistReducer } from "redux-persist";
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart", "productsFavorite"],
};
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  blacklist: ["orderedDetail"],
};
const rootReducer = combineReducers({
  drawer: drawerReducer,
  user: userReducer,
  home: homeReducer,
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
  commentReviews: commentReviewsReducer,
  productsFavorite: productsFavoriteReducer,
  search: searchReducer,
  adminPortfolio : adminPortfolioReducer,
  adminCategory : adminCategoryReducer,
  adminProductGroup : adminProductGroupReducer
});

export default persistReducer(rootPersistConfig, rootReducer);
