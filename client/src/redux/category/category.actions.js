import categoryActionTypes from "./category.types";

export const fetchCategoryStart = () => ({
  type: categoryActionTypes.FETCH_CATEGORY_LIST_START
})
export const fetchCategorySuccess = (categoryList) => ({
  type: categoryActionTypes.FETCH_CATEGORY_LIST_SUCCESS,
  payload: categoryList
})
export const fetchCategoryFail = (err) => ({
  type: categoryActionTypes.FETCH_CATEGORY_LIST_FAIL,
  error: err
})