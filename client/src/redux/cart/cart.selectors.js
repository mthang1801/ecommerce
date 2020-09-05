import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart.cartItems
);
export const selectCartShow = createSelector(selectCart, (cart) => cart.show);

export const selectCountItem = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)
);

export const selectTotalPrice = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce(
    (accumulator, item) => accumulator + item.quantity * item.price,
    0
  )
);

export const selectCartPosition = createSelector(
  selectCart,
  (cart) => cart.cartPosition
);
