import cartActionTypes from "./cart.types";
import {
  addItemToCartUtility,
  decreaseCartItemUtility,
  increaseCartItemUtility,
  removeCartItemUtility,
} from "./cart.utils";
const INITIAL_STATE = {
  cartItems: [],
  show: false,
  cartPosition: null,
  openToolTip: false,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartActionTypes.TOGGLE_CART:
      return {
        ...state,
        show: !state.show,
      };
    case cartActionTypes.CLOSE_CART:
      return {
        ...state,
        show: false,
      };
    case cartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCartUtility(
          state.cartItems,
          action.payload.item,
          action.payload.quantity
        ),
      };
    case cartActionTypes.INCREASE_ITEM:
      return {
        ...state,
        cartItems: increaseCartItemUtility(state.cartItems, action.payload),
      };
    case cartActionTypes.DECREASE_ITEM:
      return {
        ...state,
        cartItems: decreaseCartItemUtility(state.cartItems, action.payload),
      };
    case cartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeCartItemUtility(state.cartItems, action.payload),
      };
    case cartActionTypes.CLEAR_CART_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case cartActionTypes.SET_CART_CHECKOUT_POSITION:
      return {
        ...state,
        cartPosition: +action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
