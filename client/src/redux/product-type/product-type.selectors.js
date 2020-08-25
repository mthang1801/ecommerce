import { createSelector } from "reselect";

const selectProductType = (state) => state.productType;
export const selectProductTypeList = createSelector(
  selectProductType,
  (productType) => productType.productTypeList
);

export const selectProductTypeLoading = createSelector(
  selectProductType,
  (productType) => productType.loading
);
