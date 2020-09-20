import { createSelector } from "reselect";

const selectCategory = (state) => state.category;
export const selectCategoryList = createSelector(
  selectCategory,
  (category) => category.categoryList
);

export const selectCategoryLoading = createSelector(
  selectCategory,
  (category) => category.loading
);

export const selectProductTypeList = createSelector(
  selectCategory,
  (category) => category.productTypeList
);

export const selectDiscountProductList = createSelector(
  selectCategory,
  (category) => category.discountProductList
);

export const selectTopRatedProducts = createSelector(
  selectCategory,
  (category) => category.topRatedProducts
);

export const selectBestSellerProducts = createSelector(
  selectCategory,
  (category) => category.bestSellerProducts
);
export const selectProductList = createSelector(
  selectCategory,
  (category) => category.productList
);

export const selectNumProducts = createSelector(
  selectCategory,
  (category) => category.numProducts
);
export const selectNumPages = createSelector(
  selectCategory,
  (category) => category.numPages
);
export const selectCategoryError = createSelector(
  selectCategory,
  (category) => category.error
);
export const selectMaxPrice = createSelector(
  selectCategory,
  (category) => category.maxPrice
);

export const selectCurrentPage = createSelector(
  selectCategory,
  (category) => category.currentPage
);

export const selectLoadingProductList = createSelector(
  selectCategory,
  (category) => category.loadingProductList
);

export const selectProductFetched = createSelector(
  selectCategory,
  (category) => category.fetched
);

export const selectProductsIsFilter = createSelector(
  selectCategory,
  (category) => category.isFilter
);
