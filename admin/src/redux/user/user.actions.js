import userActionTypes from "./user.types";
import axios from "axios";
import { setAuthToken } from "../../utils/setAuthToken";
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

export const fetchUser = () => async (dispatch) => {
  try {
    dispatch(fetchUserStart());
    if (!localStorage.token || !localStorage.expDate) {
      throw new Error("Authentication denied");
    }

    if (
      !localStorage.expDate ||
      Date.parse(localStorage.expDate) < Date.now()
    ) {
      localStorage.removeItem("expDate");
      localStorage.removeItem("token");
      throw new Error("Token has expired");
    }
    setAuthToken(localStorage.token);
    console.log(axios.defaults.headers);
    const { data } = await axios.get("/auth/staff");
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserFail());
  }
};

export const registerStart = () => ({
  type: userActionTypes.REGISTER_START,
});

export const registerSuccess = (user) => ({
  type: userActionTypes.REGISTER_SUCCESS,
  payload: user,
});

export const registerFail = (err) => ({
  type: userActionTypes.REGISTER_FAIL,
  payload: err,
});

export const register = (formData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(formData);
      dispatch(registerStart());
      const {
        data: { token, user },
      } = await axios.post("/staff/register", formData);
      localStorage.setItem("token", token);
      localStorage.setItem("expDate", new Date(Date.now() + 60 * 60 * 1000));
      dispatch(registerSuccess(user));
      resolve(true);
    } catch (error) {
      dispatch(registerFail(error.message));
      reject(error);
    }
  });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("expDate");
  setAuthToken(null);
  dispatch({
    type: userActionTypes.LOGOUT,
  });
};

export const loginStart = () => ({
  type: userActionTypes.LOGIN_START,
});

export const loginSuccess = (user) => ({
  type: userActionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFail = (err) => ({
  type: userActionTypes.LOGIN_FAIL,
  payload: err,
});

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginStart());
    console.log(email, password);
    const {
      data: { user, token },
    } = await axios.post("/auth/staff", { email, password });
    localStorage.setItem("token", token);
    localStorage.setItem("expDate", new Date(Date.now() + 60 * 60 * 1000));
    dispatch(loginSuccess(user));
  } catch (error) {
    dispatch(loginFail(error));
  }
};
