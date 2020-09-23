import homeActionTypes from "./home.types";
import urls from "../../utils/urls";
import axios from "axios";
const fetchHomeContentListStart = () => ({
  type: homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_START,
});

const fetchHomeContentListSuccess = (
  categoryList,
  productsLatest,
  productsBestSeller,
  productsTopRated
) => ({
  type: homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_SUCCESS,
  payload: {
    categoryList,
    productsLatest,
    productsBestSeller,
    productsTopRated,
  },
});

const fetchHomeContentListFail = (err) => ({
  type: homeActionTypes.FETCH_HOME_PAGE_CONTENT_LIST_FAIL,
  payload: { msg: err.response.data.message, status: err.response.status },
});

export const fetchHomeContentList = () => async (dispatch) => {
  try {
    dispatch(fetchHomeContentListStart());
    const {
      data: {
        categoryList,
        productsLatest,
        productsBestSeller,
        productsTopRated,
      },
    } = await axios.get(urls.GET_HOME_CONTENT_LIST);
    dispatch(
      fetchHomeContentListSuccess(
        categoryList,
        productsLatest,
        productsBestSeller,
        productsTopRated
      )
    );
  } catch (error) {
    dispatch(fetchHomeContentListFail(error));
  }
};
