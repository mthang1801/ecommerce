import adminCategoriesActionTypes from "./admin-category.types";
import axios from "axios";
import {api} from "../../utils/api"
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64"

export const fetchAdminCategoriesStart = () => ({
  type: adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_START,
});

export const fetchAdminCategoriesSuccess = (adminCategoriesList, count) => ({
  type: adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_SUCCESS,
  payload: { adminCategoriesList, count },
});

export const fetchAdminCategoriesFail = (err) => ({
  type: adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_FAIL,
  payload: err,
});

export const fetchAdminCategories = (
  skip,
  limit 
) => async (dispatch) => {
  try {
    dispatch(fetchAdminCategoriesStart());
    const { data } = await axios({
      method: "GET",
      url: `${api.FETCH_ADDMIN_CATEGORIES}?skip=${skip}&limit=${limit}`,
    });
    if(data.categories.length){
      const standardizedData = data.categories.map( category  => {
        const _category = {...category};
        _category.image.data = arrayBufferToBase64(_category.image.data.data);
        return {..._category}
      })      
      console.log(standardizedData, data.count)
      return dispatch(fetchAdminCategoriesSuccess(standardizedData, data.count));
    }
    
    return dispatch(fetchAdminCategoriesSuccess(data.categories, data.count))

  } catch (error) {
    dispatch(fetchAdminCategoriesFail(error.message));
  }
};

export const addAdminCategoryStart = () => ({
  type: adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_START,
});

export const addAdminCategorySuccess = (newAdminCategories) => ({
  type: adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_SUCCESS,
  payload: newAdminCategories,
});

export const addAdminCategoryFail = (err) => ({
  type: adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_FAIL,
  payload: err,
});

export const addAdminCategory = (category) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(addAdminCategoryStart());
      const { data } = await axios({
        method: "POST",
        url: api.POST_ADD_NEW_CATEGORY,
        data: category,
      });
      const standardizedData = {...data , image : {
        ...data.image,
        data : arrayBufferToBase64(data.image.data.data)
      }}     
      dispatch(addAdminCategorySuccess(standardizedData));
      resolve(true);
    } catch (error) {
      dispatch(addAdminCategoryFail(error.message));
      reject(error.message);
    }
  });
};

export const searchAdminCategoryStart = () => ({
  type: adminCategoriesActionTypes.SEARCH_ADMIN_CATEGORIES_START,
});
export const searchAdminCategorySuccess = (adminCategoriesList) => ({
  type: adminCategoriesActionTypes.SEARCH_ADMIN_CATEGORIES_SUCCESS,
  payload: adminCategoriesList,
});
export const searchAdminCategoryFail = (err) => ({
  type: adminCategoriesActionTypes.SEARCH_ADMIN_CATEGORIES_FAIL,
  payload: err,
});

export const searchAdminCategories = (searchKey) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(searchAdminCategoryStart());
      const { data } = await axios({
        method: "GET",
        url: `/product-types?search=${searchKey}`,
      });
      dispatch(searchAdminCategorySuccess(data));
      resolve(true);
    } catch (error) {
      dispatch(searchAdminCategoryFail(error.message));
      reject(error.message);
    }
  });
};

export const findAdminCategoriesById = (productTypeId) => {
  if (!productTypeId) {
    return null;
  }
  return new Promise(async (resolve, reject) => {
    try {
      console.log(productTypeId);
      const { data } = await axios({
        method: "GET",
        url: `/product-types/${productTypeId}`,
      });
      
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const editAdminCategoriesStart = () => ({
  type: adminCategoriesActionTypes.EIDT_ADMIN_CATEGORY_START,
});
export const editAdminCategoriesSuccess = (productType) => ({
  type: adminCategoriesActionTypes.EIDT_ADMIN_CATEGORY_SUCCESS,
  payload: productType,
});
export const editAdminCategoriesFail = (err) => ({
  type: adminCategoriesActionTypes.EIDT_ADMIN_CATEGORY_FAIL,
  payload: err,
});

export const editAdminCategories = (adminCategoriesData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!adminCategoriesData) {
        reject(new Error("Không tìm thấy loại sp"));
      }
      dispatch(editAdminCategoriesStart());     
      const { data } = await axios({
        url: api.EDIT_ADMIN_CATEGORY,
        method: "PUT",
        data: adminCategoriesData,
      });
      console.log(data)
      const standardizedData = {...data , image : {
        ...data.image,
        data : arrayBufferToBase64(data.image.data.data)
      }}     
      dispatch(editAdminCategoriesSuccess(standardizedData));
      resolve(true);
    } catch (error) {
      dispatch(editAdminCategoriesFail(error.message));
      reject(error);
    }
  });
};

export const removeAdminCategoryStart = () => ({
  type: adminCategoriesActionTypes.REMOVE_ADMIN_CATEGORY_START,
});

export const removeAdminCategorySuccess = (id) => ({
  type: adminCategoriesActionTypes.REMOVE_ADMIN_CATEGORY_SUCCESS,
  payload: id,
});

export const removeAdminCategoryFail = () => ({
  type: adminCategoriesActionTypes.REMOVE_ADMIN_CATEGORY_FAIL,
});

export const removeAdminCategory = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(removeAdminCategoryStart());
      const res = await axios.delete(api.REMOVE_ADMIN_CATEGORY, { data: { id } });
      dispatch(removeAdminCategorySuccess(id));
      resolve(true);
    } catch (error) {
      dispatch(removeAdminCategoryFail(error.message));
      reject(error.message);
    }
  });
};
