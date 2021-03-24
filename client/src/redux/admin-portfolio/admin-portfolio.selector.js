import { createSelector } from "reselect";

export const selectAdminPortfolio = (state) => state.adminPortfolio;

export const selectAdminPortfolioList = createSelector(
  selectAdminPortfolio,
  (portfolio) => portfolio.portfolioList
);

export const selectLoadingAdminPortfolioList = createSelector(
  selectAdminPortfolio,
  (portfolio) => portfolio.loading
);
