import { createSelector } from "reselect";

export const selectAdminProductGroups = (state) => state.adminProductGroup;

export const selectAdminProductGroupsList = createSelector(
  selectAdminProductGroups,
  (adminProductGroup) => adminProductGroup.adminProductGroupsList
);

export const selectAdminProductGroupsLoading = createSelector(
  selectAdminProductGroups,
  (adminProductGroup) => adminProductGroup.loading
);

export const selectAdminProductGroupsCount = createSelector(
  selectAdminProductGroups,
  (adminProductGroup) => adminProductGroup.count
);
