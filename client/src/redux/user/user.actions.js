import userActionTypes from "./user.types";
import axios from "axios";
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
      dispatch(restoreAccountFail(error.message));
      reject(false);
    }
  });
};
