import { createSelector } from "reselect";

export const selectAdminCategories = (state) => state.adminCategory;

export const selectAdminCategoriesList = createSelector(
  selectAdminCategories,
  (adminCategory) => adminCategory.adminCategoriesList
);

export const selectAdminCategoriesLoading = createSelector(
  selectAdminCategories,
  (adminCategory) => adminCategory.loading
);

export const selectAdminCategoriesCount = createSelector(
  selectAdminCategories,
  (adminCategory) => adminCategory.count
);
