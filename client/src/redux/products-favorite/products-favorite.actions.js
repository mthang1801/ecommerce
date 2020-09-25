import productsFavoriteActionTypes from "./products-favorite.types";

export const addOrRemoveProductFavorite = (productId) => ({
  type: productsFavoriteActionTypes.ADD_OR_REMOVE_FAVORITE_PRODUCTS,
  payload: productId,
});

export const clearFavoriteProducts = () => ({
  type: productsFavoriteActionTypes.CLEAR_FAVORITE_PRODUCTS,
});
