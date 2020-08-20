import { createSelector } from "reselect";

const selectSeller = (state) => state.seller;

export const selectRegisterForm = createSelector(
  selectSeller,
  (seller) => seller.register
);

export const selectTerm = createSelector(selectSeller, (seller) => seller.term);

export const selectCreateProductForm = createSelector(
  selectSeller,
  (seller) => seller.product
);
