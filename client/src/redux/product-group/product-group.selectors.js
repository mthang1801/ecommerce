import { createSelector } from "reselect";

const selectProductGroup = (state) => state.productGroup;

export const selectProductGroupLoading = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.loading
);

export const selectName = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.name
);

export const selectDiscountProductList = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.discountProductList
);

export const selectTopRatedProducts = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.topRatedProducts
);

export const selectBestSellerProducts = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.bestSellerProducts
);

export const selectProductList = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.productList
);

export const selectNumProducts = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.numProducts
);
export const selectNumPages = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.numPages
);
export const selectProductGroupError = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.error
);
export const selectMaxPrice = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.maxPrice
);

export const selectCurrentPage = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.currentPage
);

export const selectLoadingProductList = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.loadingProductList
);

export const selectProductFetched = createSelector(
  selectProductGroup,
  (productGroup) => productGroup.fetched
);
