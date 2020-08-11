import { createSelector } from "reselect";

export const selectCategory = (state) => state.category;

export const selectCategoryList = createSelector(
  selectCategory,
  (category) => category.categoryList
);

export const selectLoadingCategoryList = createSelector(
  selectCategory,
  (category) => category.loading
);
