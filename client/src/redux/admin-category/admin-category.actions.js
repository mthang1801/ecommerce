import adminCategoriesActionTypes from "./admin-category.types";
import axios from "axios";
import { api } from "../../utils/api";
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64";

export const fetchAdminCategoriesStart = () => ({
  type: adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_START,
});

export const fetchAdminCategoriesSuccess = (adminCategoriesList, count) => ({
  type: adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_SUCCESS,
  payload: { adminCategoriesList, count },
});

export const fetchAdminCategoriesFail = (error) => ({
  type: adminCategoriesActionTypes.FETCH_ADMIN_CATEGORIES_FAIL,
  payload: { msg: error.response.data.message, status: error.response.status },
});

export const fetchAdminCategories = (skip, limit) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(fetchAdminCategoriesStart());
      const { data } = await axios({
        method: "GET",
        url: `${api.FETCH_ADDMIN_CATEGORIES}?skip=${skip}&limit=${limit}`,
      });

      dispatch(fetchAdminCategoriesSuccess(data.categories, data.count));
      return resolve(true);
    } catch (error) {
      dispatch(fetchAdminCategoriesFail(error.message));
      reject(error?.response?.data?.message);
    }
  });
};

export const addAdminCategoryStart = () => ({
  type: adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_START,
});

export const addAdminCategorySuccess = (newAdminCategories) => ({
  type: adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_SUCCESS,
  payload: newAdminCategories,
});

export const addAdminCategoryFail = (error) => ({
  type: adminCategoriesActionTypes.ADD_ADMIN_CATEGORY_FAIL,
  payload: { msg: error.response.data.message, status: error.response.status },
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
      dispatch(addAdminCategorySuccess(data.category));
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
export const searchAdminCategoryFail = (error) => ({
  type: adminCategoriesActionTypes.SEARCH_ADMIN_CATEGORIES_FAIL,
  payload: { msg: error.response.data.message, status: error.response.status },
});

export const searchAdminCategories = (searchKey) => async (dispatch) => {
  try {
    dispatch(searchAdminCategoryStart());
    const { data } = await axios.get(api.SEARCH_CATEGORY(searchKey));
    dispatch(searchAdminCategorySuccess(data));
  } catch (error) {
    dispatch(searchAdminCategoryFail(error.message));
  }
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
export const editAdminCategoriesFail = (error) => ({
  type: adminCategoriesActionTypes.EIDT_ADMIN_CATEGORY_FAIL,
  payload: { msg: error.response.data.message, status: error.response.status },
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
      
      dispatch(editAdminCategoriesSuccess(data.category));
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
      const res = await axios.delete(api.REMOVE_ADMIN_CATEGORY, {
        data: { id },
      });
      dispatch(removeAdminCategorySuccess(id));
      resolve(true);
    } catch (error) {
      dispatch(removeAdminCategoryFail(error.message));
      reject(error.message);
    }
  });
};

const generateManyCategoriesStart = () => ({
  type : adminCategoriesActionTypes.GENERATE_MANY_CATEGORIES_START
})
const generateManyCategoriesSuccess = (newCategories) => ({
  type : adminCategoriesActionTypes.GENERATE_MANY_CATEGORIES_SUCCESS,
  payload : newCategories
})
const generateManyCategoriesFail = (error) => ({
  type : adminCategoriesActionTypes.GENERATE_MANY_CATEGORIES_FAIL,
  payload: { msg: error.response.data.message, status: error.response.status },
})

export const generateManyCategories = (categoryData) => dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(generateManyCategoriesStart());
      const {data} = await axios({
        url : api.GENERATE_MANY_CATEGORIES,
        method : "POST", 
        data : categoryData
      })
      dispatch(generateManyCategoriesSuccess(data.categoriesList))
      resolve(true);
    } catch (error) {
      dispatch(generateManyCategoriesFail(error))
      reject(false);
    }
  })
}