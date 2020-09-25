import { createSelector } from "reselect";

const selectHome = (state) => state.home;

export const selectCategoryList = createSelector(
  selectHome,
  (home) => home.categoryList
);

export const selectProductsLatest = createSelector(
  selectHome,
  (home) => home.productsLatest
);
export const selectProductsBestSeller = createSelector(
  selectHome,
  (home) => home.productsBestSeller
);
export const selectProductsTopRated = createSelector(
  selectHome,
  (home) => home.productsTopRated
);
export const selectProductsFavorite = createSelector(
  selectHome,
  (home) => home.productsFavorite
);

export const selectHomeIsLoading = createSelector(
  selectHome,
  (home) => home.loading
);
