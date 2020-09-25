import userActionTypes from "./user.types";
import axios from "axios";
import urls from "../../utils/urls";
export const fetchUserStart = () => ({
  type: userActionTypes.FETCH_USER_START,
});
export const fetchUserSuccess = (user) => ({
  type: userActionTypes.FETCH_USER_SUCCESS,
  payload: user,
});
export const fetchUserFail = () => ({
  type: userActionTypes.FETCH_USER_FAIL,
});

export const registerStart = (name, email, password) => ({
  type: userActionTypes.REGISTER_START,
  payload: { name, email, password },
});

export const registerSuccess = (user) => ({
  type: userActionTypes.REGISTER_SUCCESS,
  payload: user,
});

export const registerFail = (err) => ({
  type: userActionTypes.REGISTER_FAIL,
  payload: err,
});

export const logoutStart = () => ({
  type: userActionTypes.LOGOUT_START,
});

export const logoutSuccess = () => ({
  type: userActionTypes.LOGOUT_SUCCESS,
});

export const checkAuthTimeout = (timeout) => ({
  type: userActionTypes.CHECK_AUTH_TIMEOUT,
  payload: timeout,
});

export const loginStart = (email, password) => ({
  type: userActionTypes.LOGIN_START,
  payload: { email, password },
});

export const loginSuccess = (user) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFail = (err) => ({
  type: userActionTypes.LOGIN_FAIL,
  payload: err,
});

export const loginFacebookStart = (id, name, email) => ({
  type: userActionTypes.LOGIN_VIA_FACEBOOK_START,
  payload: { id, email, name },
});
export const loginGoogleStart = (id, name, email) => ({
  type: userActionTypes.LOGIN_VIA_GOOGLE_START,
  payload: { id, email, name },
});

export const restoreAccountStart = () => ({
  type: userActionTypes.RESTORE_ACCOUNT_START,
});

export const restoreAccountSuccess = () => ({
  type: userActionTypes.RESTORE_ACCOUNT_SUCCESS,
});

export const restoreAccountFail = (err) => ({
  type: userActionTypes.RESTORE_ACCOUNT_FAIL,
  payload: err,
});

export const restoreAccount = (email) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      dispatch(restoreAccountStart());
      console.log(axios.defaults.headers);
      await axios.post("/user/restore-account", { email });
      dispatch(restoreAccountSuccess());
      resolve(true);
    } catch (error) {
      dispatch(restoreAccountFail(error.response.data.message));
      reject(false);
    }
  });
};

export const updateUserInfoSuccess = (userInformation) => ({
  type: userActionTypes.UPDATE_USER_INFO_SUCCESS,
  payload: userInformation,
});

export const updateUserInfo = (userInfo) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.put(urls.UPDATE_USER_INFO, { userInfo });
      dispatch(updateUserInfoSuccess(data));
      resolve(true);
    } catch (error) {
      reject(error.response.data.message);
    }
  });
};

export const addOrRemoveFavoriteProductStart = (productId) => ({
  type: userActionTypes.ADD_OR_REMOVE_FAVORITE_PRODUCT_START,
  payload: productId,
});

export const addOrRemoveFavoriteProductSuccess = (productId) => ({
  type: userActionTypes.ADD_OR_REMOVE_FAVORITE_PRODUCT_SUCCESS,
  payload: productId,
});

export const addOrRemoveFavoriteProductFail = (error) => ({
  type: userActionTypes.ADD_OR_REMOVE_FAVORITE_PRODUCT_FAIL,
  payload: { msg: error.response.data.message, status: error.response.status },
});
