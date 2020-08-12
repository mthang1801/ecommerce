import categoryActionTypes from "./category.types";
import { findCategoryBySearchKey } from "../../utils/algorithms";
import { editCategory, removeCategory } from "./category.utils";

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
    case categoryActionTypes.EDIT_CATEGORY_START:
    case categoryActionTypes.REMOVE_CATEGORY_START:
    case categoryActionTypes.ADD_CATEGORY_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case categoryActionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        loading: false,
      };
    case categoryActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: [action.payload, ...state.categoryList],
        loading: false,
      };
    case categoryActionTypes.EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: editCategory(state.categoryList, action.payload),
        loading: false,
      };
    case categoryActionTypes.REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: removeCategory(state.categoryList, action.payload),
        loading: false,
      };
    case categoryActionTypes.FETCH_CATEGORY_FAIL:
    case categoryActionTypes.EDIT_CATEGORY_FAIL:
    case categoryActionTypes.REMOVE_CATEGORY_FAIL:
    case categoryActionTypes.ADD_CATEGORY_FAIL:
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
