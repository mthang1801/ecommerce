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
      console.log(error.data);
      dispatch(registerFail(error.message));
      reject(error);
    }
  });
};
