import adminProductGroupsActionTypes from "./admin-product-group.types";
import { editCategory } from "./admin-product-group.utils";
const INITIAL_STATE = {
  adminProductGroupsList: [],
  loading: false,
  error: undefined,
  count: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case adminProductGroupsActionTypes.FETCH_ADMIN_PRODUCT_GROUPS_START:
    case adminProductGroupsActionTypes.ADD_ADMIN_PRODUCT_GROUP_START:
    case adminProductGroupsActionTypes.SEARCH_ADMIN_PRODUCT_GROUPS_START:
    case adminProductGroupsActionTypes.REMOVE_ADMIN_PRODUCT_GROUP_START:
    case adminProductGroupsActionTypes.EIDT_ADMIN_PRODUCT_GROUP_START:
      return {
        ...state,
        loading: true,
      };
    case adminProductGroupsActionTypes.FETCH_ADMIN_PRODUCT_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminProductGroupsList: [...state.adminProductGroupsList, ...action.payload.adminProductGroupsList],
        count: action.payload.count,
      };
    case adminProductGroupsActionTypes.SEARCH_ADMIN_PRODUCT_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        adminProductGroupsList: [...action.payload],
      };
    case adminProductGroupsActionTypes.ADD_ADMIN_PRODUCT_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        adminProductGroupsList: [ {...action.payload}, ...state.adminProductGroupsList,],
        count: state.count + 1,
      };
    case adminProductGroupsActionTypes.REMOVE_ADMIN_PRODUCT_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        adminProductGroupsList: state.adminProductGroupsList.filter(
          (item) => item._id.toString() !== action.payload.toString()
        ),
        count: state.count - 1,
      };
    case adminProductGroupsActionTypes.EIDT_ADMIN_PRODUCT_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        adminProductGroupsList: editCategory(
          state.adminProductGroupsList,
          action.payload
        ),
      };
    case adminProductGroupsActionTypes.FETCH_ADMIN_PRODUCT_GROUPS_FAIL:
    case adminProductGroupsActionTypes.ADD_ADMIN_PRODUCT_GROUP_FAIL:
    case adminProductGroupsActionTypes.SEARCH_ADMIN_PRODUCT_GROUPS_FAIL:
    case adminProductGroupsActionTypes.REMOVE_ADMIN_PRODUCT_GROUP_FAIL:
    case adminProductGroupsActionTypes.EIDT_ADMIN_PRODUCT_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
