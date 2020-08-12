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

export const editCategoryStart = () => ({
  type: categoryActionTypes.EDIT_CATEGORY_START,
});

export const editCategorySuccess = (updatedCategory) => ({
  type: categoryActionTypes.EDIT_CATEGORY_SUCCESS,
  payload: updatedCategory,
});

export const editCategoryFail = (err) => ({
  type: categoryActionTypes.EDIT_CATEGORY_FAIL,
  payload: err,
});

export const editCategory = (formData) => async (dispatch) => {
  try {
    dispatch(editCategoryStart());
    const { data } = await axios.put("/admin/category", formData);
    dispatch(editCategorySuccess(data));
  } catch (error) {
    dispatch(editCategoryFail(error.message));
  }
};

export const removeCategoryStart = () => ({
  type: categoryActionTypes.REMOVE_CATEGORY_START,
});
export const removeCategorySuccess = (categoryId) => ({
  type: categoryActionTypes.REMOVE_CATEGORY_SUCCESS,
  payload: categoryId,
});
export const removeCategoryFail = (err) => ({
  type: categoryActionTypes.REMOVE_CATEGORY_FAIL,
  payload: err,
});

export const removeCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch(removeCategoryStart());
    const res = await axios.delete("/admin/category", { data: { categoryId } });
    dispatch(removeCategorySuccess(categoryId));
  } catch (error) {
    dispatch(removeCategoryFail(error.message));
  }
};

export const addCategoryStart = () => ({
  type: categoryActionTypes.ADD_CATEGORY_START,
});

export const addCategorySuccess = (category) => ({
  type: categoryActionTypes.ADD_CATEGORY_SUCCESS,
  payload: category,
});

export const addCategoryFail = (err) => ({
  type: categoryActionTypes.ADD_CATEGORY_FAIL,
  payload: err,
});

export const addCategory = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(addCategoryStart());
      const { data } = await axios.post("/admin/category", formData);
      console.log(data);
      dispatch(addCategorySuccess(data));
      resolve(true);
    } catch (error) {
      dispatch(addCategoryFail(error.message));
      reject(error);
    }
  });
};
