import { createSelector } from "reselect";

const selectSearch = (state) => state.search;

export const selectSearchKey = createSelector(
  selectSearch,
  (search) => search.searchKey
);

export const selectProductList = createSelector(
  selectSearch,
  (search) => search.productList
);

export const selectIsLoading = createSelector(
  selectSearch,
  (search) => search.loading
);

export const selectNumPages = createSelector(
  selectSearch,
  (search) => search.numPages
);

export const selectCurrentPage = createSelector(
  selectSearch,
  (search) => search.currentPage
);

export const selectNumProducts = createSelector(
  selectSearch,
  (search) => search.numProducts
);
