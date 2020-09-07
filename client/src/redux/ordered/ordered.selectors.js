import { createSelector } from "reselect";
const selectOrdered = (state) => state.ordered;
export const selectOrderedDetail = createSelector(
  selectOrdered,
  (cart) => cart.orderedDetail
);
