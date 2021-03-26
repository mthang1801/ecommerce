import adminPortfolioActionTypes from "./admin-portfolio.types";
import axios from "axios";
import {api} from "../../utils/api"
import arrayBufferToBase64 from "../../utils/arrayBufferToBase64"
import { AiFillCodeSandboxCircle } from "react-icons/ai";
export const fetchAdminPortfolioStart = () => ({
  type: adminPortfolioActionTypes.FETCH_ADMIN_PORTFOLIO_START,
});

export const fetchAdminPortfolioSuccess = (categoryList) => ({
  type: adminPortfolioActionTypes.FETCH_ADMIN_PORTFOLIO_SUCCESS,
  payload: categoryList,
});

export const fetchAdminPortfolioFail = (err) => ({
  type: adminPortfolioActionTypes.FETCH_ADMIN_PORTFOLIO_FAIL,
  payload: err,
});

export const fetchAdminPortfolioList = () => async (dispatch) => {
  try {
    dispatch(fetchAdminPortfolioStart());
    const { data } = await axios.get(api.FETCH_ADMIN_PORTFOLIOS);
    if(data.portfolios){
      const standardizedData = data.portfolios.map( portfolio  => {
        const _portfolio = {...portfolio};
        _portfolio.image.data = arrayBufferToBase64(_portfolio.image.data.data);
        return {..._portfolio}
      })      
      dispatch(fetchAdminPortfolioSuccess(standardizedData));
    }
    
    
  } catch (error) {
    dispatch(fetchAdminPortfolioFail(error.message));
  }
};

export const searchAdminPortfolio = (searchKey) => async (dispatch) => {
  try {
    dispatch(fetchAdminPortfolioStart());    
    const { data } = await axios.get(api.SEARCH_PORFOLIO(searchKey));
    
    dispatch(fetchAdminPortfolioSuccess(data));
  } catch (error) {
    dispatch(fetchAdminPortfolioFail(error.message));
  }
};

export const editAdminPortfolioStart = () => ({
  type: adminPortfolioActionTypes.EDIT_ADMIN_PORTFOLIO_START,
});

export const editAdminPortfolioSuccess = (updatedAdminPortfolio) => ({
  type: adminPortfolioActionTypes.EDIT_ADMIN_PORTFOLIO_SUCCESS,
  payload: updatedAdminPortfolio,
});

export const editAdminPortfolioFail = (err) => ({
  type: adminPortfolioActionTypes.EDIT_ADMIN_PORTFOLIO_FAIL,
  payload: err,
});

export const editAdminPortfolio = (formData) => async (dispatch) => {
  try {
    dispatch(editAdminPortfolioStart());    
    const { data } = await axios.put(api.EDIT_PORTFOLIO, formData);
    const standardizedData = {...data};
    standardizedData.image.data= arrayBufferToBase64(standardizedData.image.data.data);
    dispatch(editAdminPortfolioSuccess(standardizedData));
  } catch (error) {
    dispatch(editAdminPortfolioFail(error.message));
  }
};

export const removeAdminPortfolioStart = () => ({
  type: adminPortfolioActionTypes.REMOVE_ADMIN_PORTFOLIO_START,
});
export const removeAdminPortfolioSuccess = (categoryId) => ({
  type: adminPortfolioActionTypes.REMOVE_ADMIN_PORTFOLIO_SUCCESS,
  payload: categoryId,
});
export const removeAdminPortfolioFail = (err) => ({
  type: adminPortfolioActionTypes.REMOVE_ADMIN_PORTFOLIO_FAIL,
  payload: err,
});

export const removeAdminPortfolio = (_id) => async (dispatch) => {
  try {
    dispatch(removeAdminPortfolioStart());
    const {data} = await axios.delete(api.REMOVE_PORTFOLIO, { data: { _id } });
    if(data.status === "success"){
      dispatch(removeAdminPortfolioSuccess(_id));
    }
  } catch (error) {
    dispatch(removeAdminPortfolioFail(error.message));
  }
};

export const addAdminPortfolioStart = () => ({
  type: adminPortfolioActionTypes.ADD_ADMIN_PORTFOLIO_START,
});

export const addAdminPortfolioSuccess = (category) => ({
  type: adminPortfolioActionTypes.ADD_ADMIN_PORTFOLIO_SUCCESS,
  payload: category,
});

export const addAdminPortfolioFail = (err) => ({
  type: adminPortfolioActionTypes.ADD_ADMIN_PORTFOLIO_FAIL,
  payload: err,
});

export const addAdminPortfolio = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(addAdminPortfolioStart());
      const { data } = await axios.post(api.POST_ADD_NEW_PORTFOLIO, formData);
      const standardizedData = {...data}      
      standardizedData.image.data = arrayBufferToBase64(standardizedData.image.data.data);
      dispatch(addAdminPortfolioSuccess(standardizedData));
      resolve(true);
    } catch (error) {             
      reject(error.response.data.message);
    }
  });
};
