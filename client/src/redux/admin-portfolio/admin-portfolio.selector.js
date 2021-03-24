import { createSelector } from "reselect";

export const selectAdminPortfolio = (state) => state.adminPortfolio;

export const selectAdminPortfolioList = createSelector(
  selectAdminPortfolio,
  (category) => category.categoryList
);

export const selectLoadingAdminPortfolioList = createSelector(
  selectAdminPortfolio,
  (category) => category.loading
);
