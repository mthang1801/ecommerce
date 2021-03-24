import adminPortfolioActionTypes from "./admin-portfolio.types";
import axios from "axios";
import urls from "../../utils/urls"
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
    const { data } = await axios.get("/category");
    dispatch(fetchAdminPortfolioSuccess(data));
  } catch (error) {
    dispatch(fetchAdminPortfolioFail(error.message));
  }
};

export const searchAdminPortfolio = (searchKey) => async (dispatch) => {
  try {
    dispatch(fetchAdminPortfolioStart());
    const { data } = await axios.get(`/category?search=${searchKey}`);
    console.log(data)
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
    const { data } = await axios.put("/admin/category", formData);
    dispatch(editAdminPortfolioSuccess(data));
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

export const removeAdminPortfolio = (categoryId) => async (dispatch) => {
  try {
    dispatch(removeAdminPortfolioStart());
    const res = await axios.delete("/admin/category", { data: { categoryId } });
    dispatch(removeAdminPortfolioSuccess(categoryId));
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
      const { data } = await axios.post(urls.POST_ADD_NEW_PORTFOLIO, formData);      
      dispatch(addAdminPortfolioSuccess(data));
      resolve(true);
    } catch (error) {             
      reject(error.response.data.message);
    }
  });
};
