import categoryActionTypes from "./category.types";
import { findCategoryBySearchKey } from "../../utils/algorithms";
const INITIAL_STATE = {
  categoryList: [],
  loading: false,
  error: undefined,
  search: "",
  searchResults: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case categoryActionTypes.FETCH_CATEGORY_START:
      return {
        ...state,
        categoryList: [],
        loading: true,
        error: false,
      };
    case categoryActionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        loading: false,
      };
    case categoryActionTypes.FETCH_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case categoryActionTypes.SEARCH_CATEGORY:
      return {
        ...state,
        loading: false,
        search: action.payload,
        searchResults: findCategoryBySearchKey(
          state.categoryList,
          action.payload
        ),
      };
    default:
      return state;
  }
};
