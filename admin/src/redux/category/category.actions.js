import categoryActionTypes from "./category.types";
import axios from "axios";
export const fetchCategoryStart = () => ({
  type: categoryActionTypes.FETCH_CATEGORY_START,
});

export const fetchCategorySuccess = (categoryList) => ({
  type: categoryActionTypes.FETCH_CATEGORY_SUCCESS,
  payload: categoryList,
});

export const fetchCategoryFail = (err) => ({
  type: categoryActionTypes.FETCH_CATEGORY_FAIL,
  payload: err,
});

export const fetchCategoryList = () => async (dispatch) => {
  try {
    dispatch(fetchCategoryStart());
    const { data } = await axios.get("/category");
    dispatch(fetchCategorySuccess(data));
  } catch (error) {
    dispatch(fetchCategoryFail(error.message));
  }
};

export const searchCategory = (searchKey) => async (dispatch) => {
  try {
    dispatch(fetchCategoryStart());
    const { data } = await axios.get(`/category?search=${searchKey}`);
    dispatch(fetchCategorySuccess(data));
  } catch (error) {
    dispatch(fetchCategoryFail(error.message));
  }
};
