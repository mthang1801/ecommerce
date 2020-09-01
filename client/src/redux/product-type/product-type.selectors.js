import { createSelector } from "reselect";

const selectProductType = (state) => state.productType;

export const selectProductTypeLoading = createSelector(
  selectProductType,
  (productType) => productType.loading
);

export const selectProductTypeList = createSelector(
  selectProductType,
  (productType) => productType.productTypeList
);

export const selectProductGroupList = createSelector(
  selectProductType,
  (productType) => productType.productGroupList
);

export const selectName = createSelector(
  selectProductType,
  (productType) => productType.name
);

export const selectDiscountProductList = createSelector(
  selectProductType,
  (productType) => productType.discountProductList
);

export const selectTopRatedProducts = createSelector(
  selectProductType,
  (productType) => productType.topRatedProducts
);

export const selectBestSellerProducts = createSelector(
  selectProductType,
  (productType) => productType.bestSellerProducts
);
export const selectProductList = createSelector(
  selectProductType,
  (productType) => productType.productList
);

export const selectNumProducts = createSelector(
  selectProductType,
  (productType) => productType.numProducts
);
export const selectNumPages = createSelector(
  selectProductType,
  (productType) => productType.numPages
);
export const selectProductTypeError = createSelector(
  selectProductType,
  (productType) => productType.error
);
export const selectMaxPrice = createSelector(
  selectProductType,
  (productType) => productType.maxPrice
);

export const selectCurrentPage = createSelector(
  selectProductType,
  (productType) => productType.currentPage
);

export const selectLoadingProductList = createSelector(
  selectProductType,
  (productType) => productType.loadingProductList
);

export const selectProductFetched = createSelector(
  selectProductType,
  (productType) => productType.fetched
);

export const selectManufactorList = createSelector(
  selectProductType,
  (productType) => productType.manufactorList
);
