import productsFavoriteActionTypes from "./products-favorite.types";

const ININIAL_STATE = [];

export default (state = ININIAL_STATE, action) => {
  switch (action.type) {
    case productsFavoriteActionTypes.ADD_OR_REMOVE_FAVORITE_PRODUCTS:
      return state.includes(action.payload)
        ? state.filter((_id) => _id != action.payload)
        : [...state, action.payload];
    case productsFavoriteActionTypes.CLEAR_FAVORITE_PRODUCTS:
      return [];
    default:
      return state;
  }
};
