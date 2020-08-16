import { createSelector } from "reselect";

export const selectProducts = (state) => state.products;

export const selectProductsList = createSelector(
  selectProducts,
  (products) => products.productsList
);

export const selectProductsLoading = createSelector(
  selectProducts,
  (products) => products.loading
);

export const selectProductsCount = createSelector(
  selectProducts,
  (products) => products.count
);
