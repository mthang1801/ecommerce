import homeActionTypes from "./home.types";
import urls from "../../utils/urls";
import {api} from "../../utils/api";
import axios from "axios";
const fetchHomeContentListStart = () => ({
  type: homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_START,
});

const fetchHomeContentListSuccess = (portfolios, recommendedProducts) => ({
  type: homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_SUCCESS,
  payload: {
    portfolios,
    recommendedProducts
  },
});

const fetchHomeContentListFail = (err) => ({
  type: homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_FAIL,
  payload: { msg: err?.response?.data?.message, status: err?.response?.status },
});

export const fetchHomeContentList = () => async (dispatch) => {
  try {
    dispatch(fetchHomeContentListStart());
    const {
      data: { portfolios , recommendedProducts},
    } = await axios.get(api.GET_HOME_CONTENT_LIST);    
    dispatch(fetchHomeContentListSuccess(portfolios, recommendedProducts));
  } catch (error) {
    dispatch(fetchHomeContentListFail(error));
  }
};
