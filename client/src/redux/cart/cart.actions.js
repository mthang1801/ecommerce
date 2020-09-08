import cartActionTypes from "./cart.types";

export const toggleCart = () => ({
  type: cartActionTypes.TOGGLE_CART,
});

export const closeCart = () => ({
  type: cartActionTypes.CLOSE_CART,
});

export const addItem = (item, quantity) => ({
  type: cartActionTypes.ADD_ITEM,
  payload: { item, quantity },
});

export const increaseItem = (_id) => ({
  type: cartActionTypes.INCREASE_ITEM,
  payload: { _id },
});

export const decreaseItem = (_id) => ({
  type: cartActionTypes.DECREASE_ITEM,
  payload: { _id },
});

export const removeItem = (_id) => ({
  type: cartActionTypes.REMOVE_ITEM,
  payload: { _id },
});

export const clearCartItems = () => ({
  type: cartActionTypes.CLEAR_CART_ITEMS,
});

export const setCartCheckoutPosition = (position) => ({
  type: cartActionTypes.SET_CART_CHECKOUT_POSITION,
  payload: position,
});

export const orderedDetail = (ordered) => ({
  type: cartActionTypes.ORDERED_DETAIL,
  payload: ordered,
});

export const setMethodDelivery = (method) => ({
  type: cartActionTypes.SET_METHOD_DELIVERY,
  payload: method,
});
