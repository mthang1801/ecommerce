import { put, takeLatest, call, all, delay, take } from "redux-saga/effects";
import * as actions from "./user.actions";
import * as productActions from "../seller/seller.actions";
import userActionTypes from "./user.types";
import axios from "axios";
import urls from "../../utils/urls";
import setAuthToken from "../../utils/setAuthToken";
export function* fetchUser() {
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

    yield put(actions.fetchUserSuccess(data));
    yield put(actions.checkAuthTimeout(timeRemain));
  } catch (error) {
    yield put(actions.fetchUserFail());
  }
}

function* register({ payload: { name, email, password } }) {
  try {
    console.log(axios.defaults.headers);
    const {
      data: { token, user, expDate },
    } = yield axios.post(urls.REGISTER_URL, { name, email, password });

    localStorage.setItem("userToken", token);
    localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
    setAuthToken(token);
    yield put(actions.registerSuccess(user));
    yield put(actions.checkAuthTimeout(expDate));
  } catch (error) {
    console.log(error);
    yield put(actions.registerFail(error.response.data.message));
  }
}

function* login({ payload: { email, password } }) {
  try {
    console.log(email, password);
    const {
      data: { token, user, expDate },
    } = yield axios.post(urls.LOGIN_URL, { email, password });
    localStorage.setItem("userToken", token);
    localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
    setAuthToken(token);
    yield put(actions.loginSuccess(user));
    yield put(actions.checkAuthTimeout(expDate));
  } catch (error) {
    yield put(actions.loginFail(error.response.data.message));
  }
}

function* loginFacebook({ payload: { id, name, email } }) {
  try {
    const {
      data: { token, user, expDate },
    } = yield axios.post(urls.LOGIN_FB_URL, { id, name, email });
    localStorage.setItem("userToken", token);
    localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
    setAuthToken(token);
    yield put(actions.loginSuccess(user));
    yield put(actions.checkAuthTimeout(expDate));
  } catch (error) {
    yield put(actions.loginFail(error.response.data.message));
  }
}
function* loginGoogle({ payload: { id, name, email } }) {
  try {
    console.log(name, email);
    const {
      data: { token, user, expDate },
    } = yield axios.post(urls.LOGIN_GG_URL, { id, name, email });
    localStorage.setItem("userToken", token);
    localStorage.setItem("userExpDate", new Date(Date.now() + expDate * 1000));
    setAuthToken(token);
    yield put(actions.loginSuccess(user));
    yield put(actions.checkAuthTimeout(expDate));
  } catch (error) {
    yield put(actions.loginFail(error.response.data.message));
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
  yield put(productActions.clearAll());
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

function* onLoginFacebook() {
  yield takeLatest(userActionTypes.LOGIN_VIA_FACEBOOK_START, loginFacebook);
}
function* onLoginGoogle() {
  yield takeLatest(userActionTypes.LOGIN_VIA_GOOGLE_START, loginGoogle);
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
    call(onLoginFacebook),
    call(onLoginGoogle),
  ]);
}
