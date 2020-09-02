import { createSelector } from "reselect";

const selectManufactor = (state) => state.manufactor;

export const selectManufactorLoading = createSelector(
  selectManufactor,
  (manufactor) => manufactor.loading
);

export const selectProductGroupList = createSelector(
  selectManufactor,
  (manufactor) => manufactor.productGroupList
);

export const selectName = createSelector(
  selectManufactor,
  (manufactor) => manufactor.name
);

export const selectProductList = createSelector(
  selectManufactor,
  (manufactor) => manufactor.productList
);

export const selectNumProducts = createSelector(
  selectManufactor,
  (manufactor) => manufactor.numProducts
);
export const selectNumPages = createSelector(
  selectManufactor,
  (manufactor) => manufactor.numPages
);
export const selectManufactorError = createSelector(
  selectManufactor,
  (manufactor) => manufactor.error
);
export const selectMaxPrice = createSelector(
  selectManufactor,
  (manufactor) => manufactor.maxPrice
);

export const selectCurrentPage = createSelector(
  selectManufactor,
  (manufactor) => manufactor.currentPage
);

export const selectLoadingProductList = createSelector(
  selectManufactor,
  (manufactor) => manufactor.loadingProductList
);

export const selectProductFetched = createSelector(
  selectManufactor,
  (manufactor) => manufactor.fetched
);
