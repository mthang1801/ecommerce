import { createSelector } from "reselect";

export const selectProductTypes = (state) => state.productTypes;

export const selectProductTypesList = createSelector(
  selectProductTypes,
  (productTypes) => productTypes.productTypesList
);
