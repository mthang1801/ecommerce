import { put, takeLatest, call, all, delay } from "redux-saga/effects";
import * as actions from "./user.actions";
import userActionTypes from "./user.types";
import axios from "axios";
import urls from "../../utils/urls";
import setAuthToken from "../../utils/setAuthToken";

function* fetchUser() {
  try {
    if (!localStorage.userToken || !localStorage.userExpDate) {
      throw new Error("Authentication denied");
    }
    if (
      !localStorage.userExpDate ||
      Date.parse(localStorage.userExpDate) < Date.now()
    ) {
      localStorage.removeItem("userExpDate");
      localStorage.removeItem("userToken");
      throw new Error("Token has expired");
    }

    setAuthToken(localStorage.userToken);
    const timeRemain =
      Math.ceil(new Date(localStorage.userExpDate).getTime() - Date.now()) /
      1000;
    const { data } = yield axios.get(urls.FETCH_USER_URL);
    console.log(data);
    yield put(actions.fetchUserSuccess(data));
    console.log(timeRemain);
    yield put(actions.checkAuthTimeout(timeRemain));
  } catch (error) {
    yield put(actions.fetchUserFail(error.message));
  }
}

function* register({ payload: { name, email, password } }) {
  try {
    const {
      data: { token, user, expDate },
    } = yield axios.post(urls.REGISTER_URL, { name, email, password });

    localStorage.setItem("userToken", token);
    localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
    setAuthToken(token);
    yield put(actions.registerSuccess(user));
    yield put(actions.checkAuthTimeout(expDate));
  } catch (error) {
    yield put(actions.registerFail(error.message));
  }
}

function* login({ payload: { email, password } }) {
  try {
    const {
      data: { token, user, expDate },
    } = yield axios.post(urls.LOGIN_URL, { email, password });
    localStorage.setItem("userToken", token);
    localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
    setAuthToken(token);
    yield put(actions.loginSuccess(user));
    yield put(actions.checkAuthTimeout(expDate));
  } catch (error) {
    yield put(actions.loginFail(error.message));
  }
}

function* checkAuthTimeout({ payload }) {
  yield delay(payload * 1000);
  yield put(actions.logoutStart());
  yield call(setAuthToken, null);
}

function* logout() {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userExpDate");
  yield put(actions.logoutSuccess());
}

function* onFetchUser() {
  yield takeLatest(userActionTypes.FETCH_USER_START, fetchUser);
}

function* onRegister() {
  yield takeLatest(userActionTypes.REGISTER_START, register);
}

function* onLogin() {
  yield takeLatest(userActionTypes.LOGIN_START, login);
}

function* onLogout() {
  yield takeLatest(userActionTypes.LOGOUT_START, logout);
}

function* onCheckAuthTimeout() {
  yield takeLatest(userActionTypes.CHECK_AUTH_TIMEOUT, checkAuthTimeout);
}

export default function* userSaga() {
  yield all([
    call(onRegister),
    call(onLogout),
    call(onCheckAuthTimeout),
    call(onFetchUser),
    call(onLogin),
  ]);
}
