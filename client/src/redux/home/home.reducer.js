import homeActionTypes from "./home.types";
const INITIAL_STATE = {
  categoryList: [],
  productsLatest: [],
  productsBestSeller: [],
  productsTopRated: [],
  productsFavorite: [],
  loading: false,
  error: undefined,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_START:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_SUCCESS:
      return {
        ...state,
        categoryList: [...action.payload.categoryList],
        productsLatest: [...action.payload.productsLatest],
        productsBestSeller: [...action.payload.productsBestSeller],
        productsTopRated: [...action.payload.productsTopRated],
        productsFavorite: [...action.payload.productsFavorite],
        loading: false,
      };
    case homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_FAIL:
      return {
        ...state,
        error: { msg: action.payload.msg, status: action.payload.status },
        loading: false,
      };
    default:
      return state;
  }
};
