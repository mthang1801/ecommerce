import userActionTypes from "./user.types";

const INITIAL_STATE = {
  user: null,
  fetched: false,
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.REGISTER_START:
    case userActionTypes.FETCH_USER_START:
    case userActionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case userActionTypes.REGISTER_SUCCESS:
    case userActionTypes.FETCH_USER_SUCCESS:
    case userActionTypes.LOGIN_SUCCESS:
    case userActionTypes.RESTORE_ACCOUNT_START:
      return {
        ...state,
        fetched: true,
        user: action.payload,
        loading: false,
      };
    case userActionTypes.ADD_OR_REMOVE_FAVORITE_PRODUCT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          favorite_products: state.user.favorite_products.includes(
            action.payload
          )
            ? state.user.favorite_products.filter(
                (_id) => _id != action.payload
              )
            : [...state.user.favorite_products, action.payload],
        },
      };
    case userActionTypes.FETCH_USER_FAIL:
    case userActionTypes.LOGOUT_SUCCESS:
    case userActionTypes.RESTORE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case userActionTypes.UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
        loading: false,
      };
    case userActionTypes.REGISTER_FAIL:
    case userActionTypes.LOGIN_FAIL:
    case userActionTypes.RESTORE_ACCOUNT_FAIL:
      return {
        ...state,
        fetched: true,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
