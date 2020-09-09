import { createSelector } from "reselect";

const selectOrdered = (state) => state.ordered;

export const selectOrderedList = createSelector(
  selectOrdered,
  (ordered) => ordered.orderedList
);

export const selectOrderedLoading = createSelector(
  selectOrdered,
  (ordered) => ordered.loading
);
