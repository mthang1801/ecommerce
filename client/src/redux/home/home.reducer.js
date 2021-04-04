import homeActionTypes from "./home.types";
const INITIAL_STATE = {
  portfolios : [],
  recommendedProducts : [],
  fetched: false,
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
        portfolios : [...action.payload.portfolios],
        recommendedProducts : [...action.payload.recommendedProducts],
        fetched: true,
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
