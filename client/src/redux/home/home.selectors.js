import { createSelector } from "reselect";

const selectHome = (state) => state.home;

export const selectHomePortfolios = createSelector(
  selectHome, 
  home => home.portfolios
)

export const selectHomeIsLoading = createSelector(
  selectHome,
  (home) => home.loading
);

export const selectHomePageIsFetched = createSelector(
  selectHome,
  (home) => home.fetched
);
