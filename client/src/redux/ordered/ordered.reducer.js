import orderedActionTypes from "./ordered.styles";
const INITIAL_STATE = {
  orderedList: [],
  loading: false,
  error: undefined,
};

const orderedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case orderedActionTypes.FETCH_ORDERED_LIST_START:
      return {
        ...state,
        loading: true,
      };
    case orderedActionTypes.FETCH_ORDERED_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orderedList: action.payload,
        error: undefined,
      };
    case orderedActionTypes.FETCH_ORDERED_LIST_FAIL:
      return {
        ...state,
        loading: false,
        orderedList: [],
        error: action.payload,
      };
    default:
      return state;
  }
};


export default orderedReducer;