import { createSelector } from "reselect";

const selectProductsFavorite = (state) => state.productsFavorite;

export const selectProductsFavoriteList = createSelector(
  selectProductsFavorite,
  (productsFavorite) => productsFavorite
);
