import searchActionTypes from "./search.types";
import axios from "axios";
import urls from "../../utils/urls";

export const setSearchKey = (searchKey) => ({
  type: searchActionTypes.SET_SEARCH_KEY,
  payload: searchKey,
});

export const searchStart = () => ({
  type: searchActionTypes.SEARCH_START,
});
export const searchSuccess = (
  productList,
  numPages,
  currentPage,
  numProducts
) => ({
  type: searchActionTypes.SEARCH_SUCCESS,
  payload: { productList, numPages, currentPage, numProducts },
});
export const searchFail = (error) => ({
  type: searchActionTypes.SEARCH_FAIL,
  payload: { msg: error.response.data.message, status: error.response.status },
});

export const onSearch = (searchKey, page) => async (dispatch) => {
  try {
    dispatch(searchStart());
    console.log(page);
    const {
      data: { productList, numPages, numProducts },
    } = await axios.get(urls.SEARCH_PRODUCT_LIST, {
      params: { searchKey, page },
    });
    dispatch(searchSuccess(productList, numPages, page, numProducts));
  } catch (error) {
    dispatch(searchFail());
  }
};
