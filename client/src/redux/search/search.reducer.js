import searchActionTypes from "./search.types";
const INITIAL_STATE = {
  searchKey: "",
  productList: [],
  numPages: 1,
  currentPage: 1,
  numProducts: 0,
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchActionTypes.SEARCH_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case searchActionTypes.SET_SEARCH_KEY:
      return {
        ...state,
        searchKey: action.payload,
      };
    case searchActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        productList: action.payload.productList,
        numPages: action.payload.numPages,
        currentPage: action.payload.currentPage,
        numProducts: action.payload.numProducts,
        loading: false,
      };
    case searchActionTypes.SEARCH_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
      };
    default:
      return state;
  }
};
