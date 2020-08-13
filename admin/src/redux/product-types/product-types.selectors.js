import { createSelector } from "reselect";

export const selectProductTypes = (state) => state.productTypes;

export const selectProductTypesList = createSelector(
  selectProductTypes,
  (productTypes) => productTypes.productTypesList
);

export const selectProductTypesLoading = createSelector(
  selectProductTypes,
  (productTypes) => productTypes.loading
);

export const selectProductTypesCount = createSelector(
  selectProductTypes,
  (productTypes) => productTypes.count
);
