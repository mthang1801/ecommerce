import adminCategoriesActionTypes from "./admin-category.types";
import { editCategory } from "./admin-category.utils";
const INITIAL_STATE = {
  adminCategoriesList: [],
  loading: false,
  error: undefined,
  count: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_START:
    case adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_START:
    case adminCategoriesActionTypes.SEARCH_ADMIN_CATEGORIES_START:
    case adminCategoriesActionTypes.REMOVE_ADMIN_CATEGORY_START:
    case adminCategoriesActionTypes.EIDT_ADMIN_CATEGORY_START:
      return {
        ...state,
        loading: true,
      };
    case adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        adminCategoriesList: [...state.adminCategoriesList, ...action.payload.adminCategoriesList],
        count: action.payload.count,
      };
    case adminCategoriesActionTypes.SEARCH_ADMIN_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        adminCategoriesList: [...action.payload],
      };
    case adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        adminCategoriesList: [...state.adminCategoriesList, action.payload],
        count: state.count + 1,
      };
    case adminCategoriesActionTypes.REMOVE_ADMIN_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        adminCategoriesList: state.adminCategoriesList.filter(
          (item) => item._id.toString() !== action.payload.toString()
        ),
        count: state.count - 1,
      };
    case adminCategoriesActionTypes.EIDT_ADMIN_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        adminCategoriesList: editCategory(
          state.adminCategoriesList,
          action.payload
        ),
      };
    case adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_FAIL:
    case adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_FAIL:
    case adminCategoriesActionTypes.SEARCH_ADMIN_CATEGORIES_FAIL:
    case adminCategoriesActionTypes.REMOVE_ADMIN_CATEGORY_FAIL:
    case adminCategoriesActionTypes.EIDT_ADMIN_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
