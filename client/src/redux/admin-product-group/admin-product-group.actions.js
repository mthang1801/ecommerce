import adminProductGroupsActionTypes from "./admin-product-group.types";
import axios from "axios";
import { api } from "../../utils/api";
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64";

export const fetchAdminProductGroupsStart = () => ({
  type: adminProductGroupsActionTypes.FETCH_ADMIN_PRODUCT_GROUPS_START,
});

export const fetchAdminProductGroupsSuccess = (adminProductGroupsList, count) => ({
  type: adminProductGroupsActionTypes.FETCH_ADMIN_PRODUCT_GROUPS_SUCCESS,
  payload: { adminProductGroupsList, count },
});

export const fetchAdminProductGroupsFail = (err) => ({
  type: adminProductGroupsActionTypes.FETCH_ADMIN_PRODUCT_GROUPS_FAIL,
  payload: err,
});

export const fetchAdminProductGroups = (skip, limit) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(fetchAdminProductGroupsStart());      
      const { data } = await axios({
        method: "GET",
        url: `${api.FETCH_ADMIN_PRODUCT_GROUPS}?skip=${skip}&limit=${limit}`,
      });                 
      dispatch(fetchAdminProductGroupsSuccess(data.productGroups, data.count));
      resolve(true);
    } catch (error) {
      dispatch(fetchAdminProductGroupsFail(error.message));
      reject(error?.response?.data?.message);
    }
  });
};

export const addAdminProductGroupStart = () => ({
  type: adminProductGroupsActionTypes.ADD_ADMIN_PRODUCT_GROUP_START,
});

export const addAdminProductGroupSuccess = (newAdminProductGroups) => ({
  type: adminProductGroupsActionTypes.ADD_ADMIN_PRODUCT_GROUP_SUCCESS,
  payload: newAdminProductGroups,
});

export const addAdminProductGroupFail = (err) => ({
  type: adminProductGroupsActionTypes.ADD_ADMIN_PRODUCT_GROUP_FAIL,
  payload: err,
});

export const addAdminProductGroup = (productGroup) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(addAdminProductGroupStart());
      const { data } = await axios({
        method: "POST",
        url: api.POST_ADD_NEW_PRODUCT_GROUP,
        data: productGroup,
      });     
      dispatch(addAdminProductGroupSuccess(data.productGroup));
      resolve(true);
    } catch (error) {
      dispatch(addAdminProductGroupFail(error.message));
      reject(error.message);
    }
  });
};

export const searchAdminProductGroupStart = () => ({
  type: adminProductGroupsActionTypes.SEARCH_ADMIN_PRODUCT_GROUPS_START,
});
export const searchAdminProductGroupSuccess = (adminProductGroupsList) => ({
  type: adminProductGroupsActionTypes.SEARCH_ADMIN_PRODUCT_GROUPS_SUCCESS,
  payload: adminProductGroupsList,
});
export const searchAdminProductGroupFail = (err) => ({
  type: adminProductGroupsActionTypes.SEARCH_ADMIN_PRODUCT_GROUPS_FAIL,
  payload: err,
});

export const searchAdminProductGroups = (searchKey) => async (dispatch) => {
  
    try {
      dispatch(searchAdminProductGroupStart());      
      const { data } = await axios.get(api.SEARCH_PRODUCT_GROUP(searchKey))      
      dispatch(searchAdminProductGroupSuccess(data));
     
    } catch (error) {
      dispatch(searchAdminProductGroupFail(error.message));      
    }
  
};

export const findAdminProductGroupsById = (productTypeId) => {
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

export const editAdminProductGroupsStart = () => ({
  type: adminProductGroupsActionTypes.EIDT_ADMIN_PRODUCT_GROUP_START,
});
export const editAdminProductGroupsSuccess = (productType) => ({
  type: adminProductGroupsActionTypes.EIDT_ADMIN_PRODUCT_GROUP_SUCCESS,
  payload: productType,
});
export const editAdminProductGroupsFail = (err) => ({
  type: adminProductGroupsActionTypes.EIDT_ADMIN_PRODUCT_GROUP_FAIL,
  payload: err,
});

export const editAdminProductGroups = (adminProductGroupsData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!adminProductGroupsData) {
        reject(new Error("Không tìm thấy loại sp"));
      }
      dispatch(editAdminProductGroupsStart());
      const { data } = await axios({
        url: api.EDIT_ADMIN_PRODUCT_GROUP,
        method: "PUT",
        data: adminProductGroupsData,
      });
     
      dispatch(editAdminProductGroupsSuccess(data.productGroup));
      resolve(true);
    } catch (error) {
      dispatch(editAdminProductGroupsFail(error.message));
      reject(error);
    }
  });
};

export const removeAdminProductGroupStart = () => ({
  type: adminProductGroupsActionTypes.REMOVE_ADMIN_PRODUCT_GROUP_START,
});

export const removeAdminProductGroupSuccess = (id) => ({
  type: adminProductGroupsActionTypes.REMOVE_ADMIN_PRODUCT_GROUP_SUCCESS,
  payload: id,
});

export const removeAdminProductGroupFail = () => ({
  type: adminProductGroupsActionTypes.REMOVE_ADMIN_PRODUCT_GROUP_FAIL,
});

export const removeAdminProductGroup = (id) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(removeAdminProductGroupStart());
      const res = await axios.delete(api.REMOVE_ADMIN_PRODUCT_GROUP, {
        data: { id },
      });
      dispatch(removeAdminProductGroupSuccess(id));
      resolve(true);
    } catch (error) {
      dispatch(removeAdminProductGroupFail(error.message));
      reject(error.message);
    }
  });
};
