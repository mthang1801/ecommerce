import userActionTypes from "./user.types";

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.REGISTER_START:
    case userActionTypes.FETCH_USER_FAIL:
      return {
        ...state,
        loading: true,
      };
    case userActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case userActionTypes.REGISTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
