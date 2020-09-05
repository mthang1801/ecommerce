import { call, all, put, takeLatest } from "redux-saga/effects";
import { clearCartItems } from "./cart.actions";
import userActionTypes from "../user/user.types";

export function* clearCartItemsOnSignOut() {
  yield put(clearCartItems());
}

export function* onSignoutSuccess() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartItemsOnSignOut);
}

export function* cartSaga() {
  yield all([call(onSignoutSuccess)]);
}
