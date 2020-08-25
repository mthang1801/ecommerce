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
