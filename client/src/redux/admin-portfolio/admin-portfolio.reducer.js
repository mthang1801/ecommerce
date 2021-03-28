import adminPortfolioActionTypes from "./admin-portfolio.types";
import { findPortfolioBySearchKey } from "../../utils/connectDB";
import { editPortfolio, removePortfolio } from "./admin-portfolio.utils";

const INITIAL_STATE = {
  portfolioList: [],
  loading: false,
  error: undefined,
  search: "",
  searchResults: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case adminPortfolioActionTypes.FETCH_ADMIN_PORTFOLIO_START:
    case adminPortfolioActionTypes.EDIT_ADMIN_PORTFOLIO_START:
    case adminPortfolioActionTypes.REMOVE_ADMIN_PORTFOLIO_START:
    case adminPortfolioActionTypes.ADD_ADMIN_PORTFOLIO_START:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case adminPortfolioActionTypes.FETCH_ADMIN_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolioList: [...state.portfolioList, ...action.payload],
        loading: false,
      };
    case adminPortfolioActionTypes.ADD_ADMIN_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolioList: [action.payload, ...state.portfolioList],
        loading: false,
      };
    case adminPortfolioActionTypes.EDIT_ADMIN_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolioList: editPortfolio(state.portfolioList, action.payload),
        loading: false,
      };
    case adminPortfolioActionTypes.REMOVE_ADMIN_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolioList: removePortfolio(state.portfolioList, action.payload),
        loading: false,
      };
    case adminPortfolioActionTypes.FETCH_ADMIN_PORTFOLIO_FAIL:
    case adminPortfolioActionTypes.EDIT_ADMIN_PORTFOLIO_FAIL:
    case adminPortfolioActionTypes.REMOVE_ADMIN_PORTFOLIO_FAIL:
    case adminPortfolioActionTypes.ADD_ADMIN_PORTFOLIO_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
