import userActionTypes from "./user.types";

const INITIAL_STATE = {
  user: null,
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
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case userActionTypes.FETCH_USER_FAIL:
    case userActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
      };
    case userActionTypes.REGISTER_FAIL:
    case userActionTypes.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
