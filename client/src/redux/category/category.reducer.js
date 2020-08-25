import categoryActionTypes from "./category.types";

const INITIAL_STATE = {
  categoryList: [],
  loading: false,
  error: undefined
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryActionTypes.FETCH_CATEGORY_LIST_START:
      return {
        ...state,
        error: undefined,
          loading: true
      };
    case categoryActionTypes.FETCH_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
          loading: false
      };
    case categoryActionTypes.FETCH_CATEGORY_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
          loading: false
      }
      default:
        return state;
  }
}