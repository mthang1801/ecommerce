import { createSelector } from "reselect";

const selectProduct = (state) => state.product;
export const selectProductList = createSelector(
  selectProduct,
  (product) => product.productList
);

export const selectProductLoading = createSelector(
  selectProduct,
  (product) => product.loading
);
